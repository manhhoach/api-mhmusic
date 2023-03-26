import Album from './../entities/album';
import BaseController from './base';
import AlbumService from './../services/album';


export default class AlbumController extends BaseController<Album> {
    constructor(private albumService: AlbumService){
        super(albumService);
    }
    
}