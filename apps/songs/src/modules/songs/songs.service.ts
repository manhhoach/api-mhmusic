import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as macAddress from 'macaddress';
import * as moment from 'moment-timezone';
import { Cron } from '@nestjs/schedule';
import { ValidateCreateSongDto } from './dto/create-song.dto';
import { ValidateUpdateSongDto } from './dto/update-song.dto';
import { ValidateUpdateRecentSongsDto } from './dto/update-recent-song.dto';
import { ValidateGetRecentSongsDto } from './dto/get-recent-songs.dto';

import {
  SongEntity,
  ValidateFindAllDto,
  getPagination,
  getPagingData, MESSAGES, REDIS_CONSTANTS
} from '@app/common';
import { RedisService } from '../redis/redis.service';



@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
    private readonly redisService: RedisService,
  ) { }
  create(createSongDto: ValidateCreateSongDto) {
    let data = new SongEntity();
    data = Object.assign(data, createSongDto);
    return this.songRepository.save(data);
  }

  async findAll(findAllDto: ValidateFindAllDto) {
    const { skip, limit } = getPagination(
      findAllDto.pageSize,
      findAllDto.pageIndex,
    );
    const order: any = {};

    if (findAllDto.order) {
      const orderByField = findAllDto.order.split(' ')[0] || 'createdAt';
      const orderOrder = findAllDto.order.split(' ')[1] || 'DESC';
      order[orderByField] = orderOrder;
    }
    const data = await this.songRepository.findAndCount({
      skip: skip,
      take: limit,
      order: order,
    });
    return getPagingData(data, findAllDto.pageIndex, limit);
  }

  async findById(id: string) {
    const data = await this.songRepository.findOne({
      where: { id: id },
    });

    if (!data) throw new NotFoundException();
    return data;
  }

  async update(id: string, updateSongDto: ValidateUpdateSongDto) {
    const data = await this.songRepository.update(
      { id: id },
      updateSongDto as any,
    );
    if (data.affected === 0) {
      throw new NotFoundException();
    }
    return this.songRepository.findOne({ where: { id: id } });
  }

  async delete(id: string) {
    const data = await this.songRepository.findOne({
      where: { id: id },
    });
    if (!data) throw new NotFoundException();
    return this.songRepository.delete(id);
  }

  async increViews(id: string) {
    const song = `${REDIS_CONSTANTS.SONG_ID}${id}`;
    const keyMacAddressSong = `${REDIS_CONSTANTS.MAC_ADDRESS
      }${await macAddress.one()}-${song}`;
    const isOk = await this.redisService.setKeyUniqueWithExpiredTime(
      keyMacAddressSong,
      'MUSIC',
      REDIS_CONSTANTS.RESET_TIME_LISTEN_AGAIN,
    );
    if (isOk === 'OK') {
      await this.redisService.hincrby(REDIS_CONSTANTS.HASHES_VIEW_SONGS, id, 1);
      return null;
    }
    throw new BadRequestException(MESSAGES.TRY_LATER);
  }

  async getChart() {
    const topSongs = await this.songRepository.find({
      take: REDIS_CONSTANTS.NUMBER_SONG_IN_CHARTS,
      order: { views: 'DESC' },
    });
    const arr_time = [];
    for (let i = 0; i < 12; i++) {
      arr_time.push(
        moment()
          .tz('Asia/Ho_Chi_Minh')
          .subtract(REDIS_CONSTANTS.STEP_TIME * i, 'hours')
          .format(REDIS_CONSTANTS.FORMAT_TIME),
      );
    }
    const data = await Promise.all(
      arr_time.map(async (time) => {
        let hourlyViews = await Promise.all(
          topSongs.map(async (song) => {
            const views = await this.redisService.get(
              `${time}-${REDIS_CONSTANTS.SONG_ID}${song.id}`,
            );
            return {
              id: song.id,
              name: song.name,
              percentViews: views ? parseInt(views) : 0,
            };
          }),
        );
        const totalViews = hourlyViews.reduce(
          (current, next) => current + next.percentViews,
          0,
        );
        if (totalViews !== 0)
          hourlyViews = hourlyViews.map((v) => {
            return Object.assign(v, {
              percentViews: Math.round((v.percentViews * 100) / totalViews),
            });
          });
        return {
          time: time,
          hourlyViews: hourlyViews,
        };
      }),
    );
    return { data };
  }

  @Cron(`* */${REDIS_CONSTANTS.VIEWS_UPDATE_PER_MINUTES} * * * *`)
  async updateViewsJob() {
    const allSongs = await this.redisService.hgetAll(
      REDIS_CONSTANTS.HASHES_VIEW_SONGS,
    );
    await Promise.all(
      Object.keys(allSongs).map(async (id) => {
        const views = parseInt(allSongs[id]);
        await this.songRepository.increment({ id: id }, 'views', views);
      }),
    );
    await this.redisService.del(REDIS_CONSTANTS.HASHES_VIEW_SONGS);
  }

  @Cron('0 0 * * * *')
  async calcViewsEveryHour() {
    const time = moment()
      .tz('Asia/Ho_Chi_Minh')
      .format(REDIS_CONSTANTS.FORMAT_TIME);
    const songs = await this.songRepository.find();
    await Promise.all(
      songs.map(async (song) => {
        await this.redisService.setKeyWithExpiredTime(
          `${time}-${REDIS_CONSTANTS.SONG_ID}${song.id}`,
          song.views,
          REDIS_CONSTANTS.EXPIRED_TIME_ELEMENT_CHART,
        );
      }),
    );
  }

  async updateRecentSongs(updateRecentSongsDto: ValidateUpdateRecentSongsDto) {
    const recentSongsUser = `${REDIS_CONSTANTS.USER_ID}${updateRecentSongsDto.userId}`;
    await this.redisService.remove(
      recentSongsUser,
      updateRecentSongsDto.songId,
    );
    await this.redisService.leftPush(
      recentSongsUser,
      updateRecentSongsDto.songId,
    );
    await this.redisService.setExpires(
      recentSongsUser,
      REDIS_CONSTANTS.EXPIRED_TIME_RECENT_SONGS,
    );
    if (
      (await this.redisService.length(recentSongsUser)) >
      REDIS_CONSTANTS.MAX_LENGTH_LIST_SONGS
    )
      await this.redisService.rightPop(recentSongsUser);
    return null;
  }

  async getRecentSongs(getRecentSongsDto: ValidateGetRecentSongsDto) {
    const recentSongsUser = `${REDIS_CONSTANTS.USER_ID}${getRecentSongsDto.userId}`;
    const songIds = await this.redisService.lrange(recentSongsUser);
    const songs = await this.songRepository.find({
      where: {
        id: In(songIds),
      },
      loadEagerRelations: false,
    });
    return { data: songs };
  }
}
