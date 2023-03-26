import Song from './../entities/song'
import BaseService from './base'
import SongRepository from '../repositories/song'
import macAddress from 'macaddress'
import { REDIS_VARIABLES, CONSTANT_MESSAGES } from "../helpers/constant";
import moment from 'moment-timezone';

export default class SongService extends BaseService<Song>{
    constructor(private songRepository: SongRepository) {
        super(songRepository)
    }
   
    getDetailById(id: string) {
        return this.songRepository.getDetailById(id)
    }
    
    async updateRecentSongs(userId: string, songId: string) {
        const recentSongsUser = `${REDIS_VARIABLES.USER_ID}${userId}`;
        await this.songRepository.remove(recentSongsUser, songId);

        let result = await this.songRepository.leftPush(recentSongsUser, songId);
        if (result === 0) {
            return CONSTANT_MESSAGES.UPDATE_FAILED
        }
        await this.songRepository.setExpires(recentSongsUser, REDIS_VARIABLES.EXPIRED_TIME_RECENT_SONGS)
        if (await this.songRepository.length(recentSongsUser) > REDIS_VARIABLES.MAX_LENGTH_LIST_SONGS)
            await this.songRepository.rightPop(recentSongsUser)
        return CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY

    }

    async getRecentSongs(userId: string) {
        const recentSongsUser = `${REDIS_VARIABLES.USER_ID}${userId}`;
        let songIds = await this.songRepository.lrange(recentSongsUser)
        return Promise.all(songIds.map((songId) => {
            return this.songRepository.getById(songId)
        }))
    }

    async updateViews(songId: string) {
        let song = `${REDIS_VARIABLES.SONG_ID}${songId}`;
        let keyMacAddressSong = `${REDIS_VARIABLES.MAC_ADDRESS}${await macAddress.one()}-${song}`;
        let isOk = await this.songRepository.setKeyIfNotExistWithExpiredTime(keyMacAddressSong, 'MUSIC', REDIS_VARIABLES.RESET_TIME_LISTEN_AGAIN);
        if (isOk === 'OK') {
            let data = await this.songRepository.hincrby(REDIS_VARIABLES.HASHES_VIEW_SONGS, songId, 1)
            return data;
        }
        return null;
    }

    async getChartData() {
        let songOfTop = await this.songRepository.getTopByViews(REDIS_VARIABLES.NUMBER_SONG_IN_CHART);
        let arr_time = [];
        for (let i = 0; i < 12; i++) {
            arr_time.push(moment().tz('Asia/Ho_Chi_Minh').subtract(REDIS_VARIABLES.STEP_TIME * i, 'hours').format(REDIS_VARIABLES.FORMAT_TIME))
        }
        return Promise.all(arr_time.map(async (time) => {
            let hourlyViews = await Promise.all(songOfTop.map(async (song) => {
                let views = await this.songRepository.get(`${time}-${REDIS_VARIABLES.SONG_ID}${song.id}`)
                return {
                    id: song.id,
                    name: song.name,
                    percentViews: views ? parseInt(views) : 0
                }
            }))
            let totalViews = hourlyViews.reduce((current, next) => current + next.percentViews, 0)
            if (totalViews !== 0)
                hourlyViews = hourlyViews.map((v => {
                    return Object.assign(v, { percentViews: Math.round(v.percentViews * 100 / totalViews) })
                }))
            return {
                time: time, hourlyViews: hourlyViews
            }
        }))
    }

}