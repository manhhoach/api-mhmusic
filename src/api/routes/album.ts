import BaseRoutes from './base'
import AuthJwt from './../middlewares/jwt'
import Validation from './../helpers/validate'
import CreateAlbumDto from './../dtos/album/album.create'
import UpdateAlbumDto from './../dtos/album/album.update'

import AlbumController from './../controllers/album'
import AlbumService from '../services/album'
import AlbumRepository from '../repositories/album'

export default class AlbumRoutes extends BaseRoutes {
    path = '/albums'
    constructor(private albumController: AlbumController, authJwt: AuthJwt) {
        super(authJwt)
    }
    initializeRoutes(): void {
        this.getRouter().get('/', this.albumController.getAllAndCount)

        this.getRouter().get('/:id', this.albumController.getById)

        this.getRouter().use(this.authJwt.verifyToken(false))
        
        this.getRouter().use(this.authJwt.protect)

        this.getRouter().post('/', Validation(CreateAlbumDto), this.albumController.createAndSave)

        this.getRouter().delete('/:id', this.albumController.delete)

        this.getRouter().patch('/:id', Validation(UpdateAlbumDto), this.albumController.findByIdAndUpdate)
    }

    static initRoutes(): AlbumRoutes {
        let repository = new AlbumRepository()
        let service = new AlbumService(repository)
        let controller = new AlbumController(service);
        const auth = new AuthJwt()
        let routes = new AlbumRoutes(controller, auth)
        routes.initializeRoutes();
        return routes;
    }

}