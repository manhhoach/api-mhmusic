import Song from './../entities/song'
import BaseRepository from './base'
import CreateSongDto from './../dtos/song/song.create'


export default class SongRepository extends BaseRepository<Song>{
    constructor(){
        super(Song)
    }

    // save(song: CreateSongDto): Promise<Song> {
        
    // }
}