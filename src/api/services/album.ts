import Album from './../entities/album'
import BaseService from './base'
import AlbumRepository from '../repositories/album'

export default class AlbumService extends BaseService<Album>{
    constructor(albumRepository: AlbumRepository){
        super(albumRepository)
    }
}