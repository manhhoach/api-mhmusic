import { Router } from 'express'
import Singer from './../entities/singer'
import SingerController from './../controllers/singer'
import AuthJwt from './../middlewares/jwt'
import Validation from './../helpers/validate'
import CreateSingerDto from './../dtos/singer/singer.create'
import UpdateSingerDto from './../dtos/singer/singer.update'

export default class SingerRoutes {
    private router = Router();
    public path: string = '/singers'
    private authJwt = new AuthJwt();
    private singerController = new SingerController(Singer);
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes(): void {
        this.router.get('/', this.singerController.getAllAndCount)

        this.router.get('/:id', this.singerController.getById)

        this.router.use(this.authJwt.verifyToken(false))
        
        this.router.use(this.authJwt.protect)

        this.router.post('/', Validation(CreateSingerDto), this.singerController.createAndSave)

        this.router.delete('/:id', this.singerController.delete)

        this.router.patch('/:id', Validation(UpdateSingerDto), this.singerController.findByIdAndUpdate)
    }

    public getRouter(): Router {
        return this.router;
    }

}

