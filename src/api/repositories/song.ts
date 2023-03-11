import Song from './../entities/song'
import BaseRepository from './base'
import redis from './../databases/redis'

export default class SongRepository extends BaseRepository<Song>{
    constructor(){
        super(Song)
    }

    getTopByViews(limit: number){
        return this.repository.find({
            take: limit,
            order: {"views": "DESC"}
        })
    }

    getDetailById(id: string){
        return this.repository.createQueryBuilder("song").where("song.id = :id", {id: id}).innerJoinAndSelect("song.singer", "singer").select([
            "song",
            "singer.id",
            "singer.name"
        ]).getOne()
    }

    hset(key: string, field: string, value: number){
        return redis.hset(key, field, value)
    }
    hgetAll(key: string){
        return redis.hgetall(key)
    }
    hincrby(key: string, field: string, value: number){
        return redis.hincrby(key, field, value)
    }
    del(key: string){
        return redis.del(key)
    }

    increViews(id: string, views: number){
        return this.repository.increment({id: id}, 'views', views)
    }
    get(key: string){
        return redis.get(key)
    }
    set(key: string, value: any){
        return redis.set(key, value)
    }
    incr(key: string){
        return redis.incr(key)
    }
    setKeyIfNotExistWithExpiredTime(key: string, value: string, time: number){
        return redis.set(key, value, 'EX', time, 'NX')
    }
    rightPop(key: string){
        return redis.rpop(key)
    }
    leftPush(key: string, data: string){
        return redis.lpush(key, data)
    }
    getAllElement(key: string): Promise<string[]>{
        return redis.lrange(key, 0, -1)
    }
    remove(key: string, data: string){
        return redis.lrem(key, 1, data)
    }
    length(key: string){
        return redis.llen(key)
    }
    setExpires(key: string, value: number){
        return redis.expire(key, value)
    }
}