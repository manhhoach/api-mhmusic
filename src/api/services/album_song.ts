import AlbumSong from './../entities/album_song'
import BaseService from './base'
import AlbumSongRepository from '../repositories/album_song'

export default class AlbumSongService extends BaseService<AlbumSong>{
    private albumSongRepository: AlbumSongRepository=new AlbumSongRepository()
    constructor(){
        super(AlbumSong)
    }
    getDetailById(id: string, limit: number, offset: number): Promise<[AlbumSong[], number]>{
        return this.albumSongRepository.getDetailById(id, limit, offset)
    }
}