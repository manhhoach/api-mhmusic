import BaseRoutes from './base'
import AlbumSongController from './../controllers/album_song'
import AuthJwt from './../middlewares/jwt'
import Validation from './../helpers/validate'
import CreateAlbumSongDto from './../dtos/album_song/album.song.create'

export default class AlbumSongRoutes extends BaseRoutes {
    private authJwt = new AuthJwt();
    private albumSongController = new AlbumSongController();
    path = '/album-songs'
    constructor(){
        super()
        this.initializeRoutes()
    }
    initializeRoutes(): void {
        
        this.getRouter().use(this.authJwt.verifyToken(false))
        
        this.getRouter().use(this.authJwt.protect)

        this.getRouter().post('/', Validation(CreateAlbumSongDto), this.albumSongController.createAndSave)

        this.getRouter().delete('/:id', this.albumSongController.delete)

    }

}