import Song from './../entities/song'
import BaseRepository from './base'
import {REDIS_URL} from './../../config/redisConfig'
import Redis from 'ioredis'

export default class SongRepository extends BaseRepository<Song>{
    private redis = new Redis(REDIS_URL) 
    constructor(){
        super(Song)
    }

    getDetailById(id: string){
        return this.repository.createQueryBuilder("song").where("song.id = :id", {id: id}).innerJoinAndSelect("song.singer", "singer").select([
            "song",
            "singer.id",
            "singer.name"
        ]).getOne()
    }


    popLastElement(key: string){
        return this.redis.rpop(key)
    }
    push(key: string, data: string){
        return this.redis.lpush(key, data)
    }
    getAllElement(key: string): Promise<string[]>{
        return this.redis.lrange(key, 0, -1)
    }
    findInList(key: string, data: string){
        return this.redis.lpos(key, data)
    }
    removeFromList(key: string, data: string){
        return this.redis.lrem(key, 1, data)
    }
    getLength(key: string){
        return this.redis.llen(key)
    }
    setExpires(key: string, value: number){
        return this.redis.expire(key, value)
    }
}