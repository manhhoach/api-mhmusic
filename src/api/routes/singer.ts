import BaseRoutes from './base'
import SingerController from '../controllers/singer'
import SingerService from '../services/singer'
import SingerRepository from '../repositories/singer'
import Validation from './../helpers/validate'
import CreateSingerDto from './../dtos/singer/singer.create'
import UpdateSingerDto from './../dtos/singer/singer.update'
import AuthJwt from './../middlewares/jwt';

export default class SingerRoutes extends BaseRoutes{

    path = '/singers';
    constructor(private singerController: SingerController, authJwt: AuthJwt) {
        super(authJwt);
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

    static initRoutes(): SingerRoutes {
        let repository = new SingerRepository()
        let service = new SingerService(repository)
        let controller = new SingerController(service);
        const auth = new AuthJwt()
        let routes = new SingerRoutes(controller, auth)
        routes.initializeRoutes();
        return routes;
    }

}