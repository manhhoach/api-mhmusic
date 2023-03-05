import { Router } from 'express'
import UserController from './../controllers/user'
import AuthJwt from './../middlewares/jwt'
import Validation from './../helpers/validate'
import CreateUserDto from './../dtos/user/user.create'

export default class UserRoutes {
    private router = Router();
    private authJwt = new AuthJwt();
    private userController = new UserController();
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes(): void {
        this.router.post('/login', this.userController.login)
        this.router.post('/register', Validation(CreateUserDto), this.userController.register)

        this.router.get('/me', this.authJwt.verifyToken(false), this.userController.getMe)
        this.router.patch('/me', this.authJwt.verifyToken(false), this.userController.updateMe)
        this.router.patch('/change-password', this.authJwt.verifyToken(true), this.userController.changePassword)
    }

    public getRouter(): Router {
        return this.router;
    }

}

// const router = Router();

// router.post('/register', userController.register)
// router.post('/login', userController.login)

// router.use(checkJwt.checkToken)
// router.get('/', userController.getMe)
// router.patch('/', userController.updateMe)
// router.patch('/change-password', userController.changePassword)
