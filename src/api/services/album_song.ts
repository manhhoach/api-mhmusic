import AlbumSong from './../entities/album_song'
import BaseService from './base'

export default class AlbumSongService extends BaseService<AlbumSong>{
    constructor(){
        super(AlbumSong)
    }
}