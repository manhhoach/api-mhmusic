import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ValidateCreateSongDto } from './dto/create-song.dto';
import { ValidateUpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MESSAGES, REDIS_CONSTANTS } from '@app/common';
import * as macAddress from 'macaddress';
import * as moment from 'moment-timezone';

import {
  SongEntity,
  ValidateFindAllDto,
  getPagination,
  getPagingData,
} from '@app/common';
import { RedisService } from '../redis/redis.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ValidateUpdateRecentSongsDto } from './dto/update-recent-song.dto';
import { ValidateGetRecentSongsDto } from './dto/get-recent-songs.dto';

@Injectable()
export class SongsService {

  constructor(
    @InjectRepository(SongEntity) private readonly songRepository: Repository<SongEntity>,
    private readonly redisService: RedisService
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
    let data = await this.songRepository.update({ id: id }, updateSongDto as any);
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
    let song = `${REDIS_CONSTANTS.SONG_ID}${id}`;
    let keyMacAddressSong = `${REDIS_CONSTANTS.MAC_ADDRESS}${await macAddress.one()}-${song}`;
    let isOk = await this.redisService.setKeyUniqueWithExpiredTime(keyMacAddressSong, 'MUSIC', REDIS_CONSTANTS.RESET_TIME_LISTEN_AGAIN);
    if (isOk === 'OK') {
      await this.redisService.hincrby(REDIS_CONSTANTS.HASHES_VIEW_SONGS, id, 1);
      return null;
    }
    throw new BadRequestException(MESSAGES.TRY_LATER)
  }

  async getChart() {
    try {
      let topSongs = await this.songRepository.find({
        take: REDIS_CONSTANTS.NUMBER_SONG_IN_CHARTS,
        order: { "views": "DESC" }
      });
      let arr_time = [];
      for (let i = 0; i < 12; i++) {
        arr_time.push(moment().tz('Asia/Ho_Chi_Minh').subtract(REDIS_CONSTANTS.STEP_TIME * i, 'hours').format(REDIS_CONSTANTS.FORMAT_TIME));
      }
      let data = await Promise.all(arr_time.map(async (time) => {
        let hourlyViews = await Promise.all(topSongs.map(async (song) => {
          let views = await this.redisService.get(`${time}-${REDIS_CONSTANTS.SONG_ID}${song.id}`);
          return {
            id: song.id,
            name: song.name,
            percentViews: views ? parseInt(views) : 0
          };
        }));
        let totalViews = hourlyViews.reduce((current, next) => current + next.percentViews, 0);
        if (totalViews !== 0)
          hourlyViews = hourlyViews.map((v => {
            return Object.assign(v, { percentViews: Math.round(v.percentViews * 100 / totalViews) });
          }));
        return {
          time: time, hourlyViews: hourlyViews
        };
      }))
      return { data }
    }
    catch (err) {
      console.log(err);

    }
  }


  @Cron(`* */${REDIS_CONSTANTS.VIEWS_UPDATE_PER_MINUTES} * * * *`)
  async updateViewsJob() {
    let allSongs = await this.redisService.hgetAll(REDIS_CONSTANTS.HASHES_VIEW_SONGS);
    await Promise.all(Object.keys(allSongs).map(async (id) => {
      let views = parseInt(allSongs[id]);
      await this.songRepository.increment({ id: id }, 'views', views);
    }));
    await this.redisService.del(REDIS_CONSTANTS.HASHES_VIEW_SONGS);
  }

  @Cron('0 0 * * * *')
  async calcViewsEveryHour() {
    let time = moment().tz('Asia/Ho_Chi_Minh').format(REDIS_CONSTANTS.FORMAT_TIME);
    let songs = await this.songRepository.find();
    await Promise.all(songs.map(async (song) => {
      await this.redisService.setKeyWithExpiredTime(`${time}-${REDIS_CONSTANTS.SONG_ID}${song.id}`, song.views, REDIS_CONSTANTS.EXPIRED_TIME_ELEMENT_CHART);
    }));
  }

  async updateRecentSongs(updateRecentSongsDto: ValidateUpdateRecentSongsDto){

  }

  async getRecentSongs(getRecentSongsDto: ValidateGetRecentSongsDto){

  }
}
