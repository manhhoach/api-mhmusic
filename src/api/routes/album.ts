import BaseRoutes from './base'
import AlbumController from './../controllers/album'
import AuthJwt from './../middlewares/jwt'
import Validation from './../helpers/validate'
import CreateAlbumDto from './../dtos/album/album.create'
import UpdateAlbumDto from './../dtos/album/album.update'

export default class AlbumRoutes extends BaseRoutes {
    private authJwt = new AuthJwt();
    private albumController = new AlbumController();
    path = '/albums'
    constructor(){
        super()
        this.initializeRoutes()
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

}