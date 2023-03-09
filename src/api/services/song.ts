import Song from './../entities/singer'
import BaseService from './base'
import SongRepository from '../repositories/song'
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
        await this.songRepository.removeFromList(recentSongsUser, songId);
        
        let result = await this.songRepository.push(recentSongsUser, songId);
        if (result === 0) {
            return CONSTANT_MESSAGES.UPDATE_FAILED 
        }
        await this.songRepository.setExpires(recentSongsUser, REDIS_VARIABLES.EXPIRED_TIME_RECENT_SONGS)
        if (await this.songRepository.getLength(recentSongsUser) > REDIS_VARIABLES.MAX_LENGTH_LIST_SONGS)
            await this.songRepository.popLastElement(recentSongsUser)
        return CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY
        
    }

    async getRecentSongs(userId: string) {
        const recentSongsUser = `${REDIS_VARIABLES.USER_ID}${userId}`;
        let songIds = await this.songRepository.getAllElement(recentSongsUser)
        return Promise.all(songIds.map((songId)=>{
            return this.songRepository.getById(songId)
        }))
    }

}