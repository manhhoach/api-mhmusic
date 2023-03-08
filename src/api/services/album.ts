import Album from './../entities/album'
import BaseService from './base'

export default class AlbumService extends BaseService<Album>{
    constructor(){
        super(Album)
    }
}