import Album from './../entities/album';
import BaseRepository from './base';


export default class AlbumRepository extends BaseRepository<Album>{
    constructor(){
        super(Album);
    }
}