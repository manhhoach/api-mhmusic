// import { Router } from 'express'
// import SingerController from './../controllers/singer'
// import AuthJwt from './../middlewares/jwt'
// import Validation from './../helpers/validate'
// import CreateSingerDto from './../dtos/singer/singer.create'
// import UpdateSingerDto from './../dtos/singer/singer.update'

// export default class UserRoutes {
//     private router = Router();
//     public path: string = '/singers'
//     private authJwt = new AuthJwt();
//     private singerController = new SingerController();
//     constructor() {
//         this.initializeRoutes()
//     }
//     private initializeRoutes(): void {
//         this.router.get('/', this.singerController.getAll)

//         this.router.get('/:id', this.singerController.getOne)

//         this.router.use(this.authJwt.verifyToken(false))
        
//         this.router.use(this.authJwt.protect)

//         this.router.post('/', Validation(CreateSingerDto), this.singerController.insert)

//         this.router.delete('/:id', this.singerController.destroy)

//         this.router.patch('/:id', Validation(UpdateSingerDto), this.singerController.update)
//     }

//     public getRouter(): Router {
//         return this.router;
//     }

// }

