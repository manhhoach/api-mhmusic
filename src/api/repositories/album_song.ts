import AlbumSong from './../entities/album_song'
import BaseRepository from './base'


export default class AlbumSongRepository extends BaseRepository<AlbumSong>{
    constructor(){
        super(AlbumSong)
    }
}