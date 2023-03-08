import Album from './../entities/album'
import BaseController from './base'


export default class AlbumController extends BaseController<Album> {
    constructor(){
        super(Album)
    }
}