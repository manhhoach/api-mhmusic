import Song from './../entities/singer'
import BaseService from './base'
import SongRepository from '../repositories/song'
import macAddress from 'macaddress'
import { REDIS_VARIABLES, CONSTANT_MESSAGES } from "../helpers/constant";


export default class SongService extends BaseService<Song>{
    constructor() {
        super(Song)
    }
    private songRepository: SongRepository = new SongRepository()

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
        let songIds = await this.songRepository.getAllElement(recentSongsUser)
        return Promise.all(songIds.map((songId) => {
            return this.songRepository.getById(songId)
        }))
    }

    async updateViews(songId: string) {
        let song = `${REDIS_VARIABLES.SONG_ID}${songId}`;
        let keyMacAddressSong = `${REDIS_VARIABLES.MAC_ADDRESS}${await macAddress.one()}-${song}`;
        let isOk = await this.songRepository.setKeyIfNotExistWithExpiredTime(keyMacAddressSong, 'MUSIC', REDIS_VARIABLES.RESET_TIME_LISTEN_AGAIN);
        if (isOk === 'OK') {
            let view: any = await this.songRepository.get(song);
            if (view !== null)
                view = await this.songRepository.incr(song)
            else {
                view = await this.songRepository.set(song, 1)
                return 1
            }
            return view;
        }
        return null;
    }

}