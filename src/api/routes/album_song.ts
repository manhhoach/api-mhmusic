import BaseRoutes from './base'
import AlbumSongController from './../controllers/album_song'
import AlbumSongRepository from '../repositories/album_song'
import AlbumSongService from '../services/album_song'
import AuthJwt from './../middlewares/jwt'
import Validation from './../helpers/validate'
import CreateAlbumSongDto from './../dtos/album_song/album.song.create'

export default class AlbumSongRoutes extends BaseRoutes {
    path = '/album-songs'
    constructor(private albumSongcontroller: AlbumSongController, authJwt: AuthJwt){
        super(authJwt)
    }
    initializeRoutes(): void {
        this.getRouter().get('/:id', this.albumSongcontroller.getDetailById)
        
        this.getRouter().use(this.authJwt.verifyToken(false))
        
        this.getRouter().use(this.authJwt.protect)

        this.getRouter().post('/', Validation(CreateAlbumSongDto), this.albumSongcontroller.createAndSave)

        this.getRouter().delete('/:id', this.albumSongcontroller.delete)
    }
    static initRoutes(): AlbumSongRoutes {
        let repository = new AlbumSongRepository()
        let service = new AlbumSongService(repository)
        let controller = new AlbumSongController(service);
        const auth = new AuthJwt()
        let routes = new AlbumSongRoutes(controller, auth)
        routes.initializeRoutes();
        return routes;
    }

}