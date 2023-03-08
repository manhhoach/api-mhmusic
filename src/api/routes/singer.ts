import BaseRoutes from './base'
import SingerController from './../controllers/singer'
import AuthJwt from './../middlewares/jwt'
import Validation from './../helpers/validate'
import CreateSingerDto from './../dtos/singer/singer.create'
import UpdateSingerDto from './../dtos/singer/singer.update'

export default class SingerRoutes extends BaseRoutes {
    private authJwt = new AuthJwt();
    private singerController = new SingerController();
    path = '/singers'
    constructor(){
        super()
        this.initializeRoutes()
    }
    initializeRoutes(): void {
        this.getRouter().get('/', this.singerController.getAllAndCount)

        this.getRouter().get('/:id', this.singerController.getById)

        this.getRouter().use(this.authJwt.verifyToken(false))
        
        this.getRouter().use(this.authJwt.protect)

        this.getRouter().post('/', Validation(CreateSingerDto), this.singerController.createAndSave)

        this.getRouter().delete('/:id', this.singerController.delete)

        this.getRouter().patch('/:id', Validation(UpdateSingerDto), this.singerController.findByIdAndUpdate)
    }

}