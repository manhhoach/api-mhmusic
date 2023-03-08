import AlbumSong from './../entities/album_song'
import BaseController from './base'


export default class AlbumSongController extends BaseController<AlbumSong> {
    constructor(){
        super(AlbumSong)
    }
}