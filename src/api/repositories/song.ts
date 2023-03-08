import Song from './../entities/song'
import BaseRepository from './base'

export default class SongRepository extends BaseRepository<Song>{
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
}