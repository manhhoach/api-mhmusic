import Song from './../entities/singer'
import BaseService from './base'
import SongRepository from '../repositories/song'

export default class SongService extends BaseService<Song>{
    constructor(){
        super(Song)
    }
    private songRepository: SongRepository = new SongRepository()

    getDetailById(id: string){
        return this.songRepository.getDetailById(id)
    }
}