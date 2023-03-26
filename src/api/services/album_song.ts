import AlbumSong from './../entities/album_song'
import BaseService from './base'
import AlbumSongRepository from '../repositories/album_song'

export default class AlbumSongService extends BaseService<AlbumSong>{
    constructor(private albumSongRepository: AlbumSongRepository){
        super(albumSongRepository)
    }
    getDetailById(id: string, limit: number, offset: number): Promise<[AlbumSong[], number]>{
        return this.albumSongRepository.getDetailById(id, limit, offset)
    }
}