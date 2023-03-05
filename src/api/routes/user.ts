import { Router } from 'express'
import UserController from './../controllers/user'
import AuthJwt from './../middlewares/jwt'
import Validation from './../helpers/validate'
import CreateUserDto from './../dtos/user/user.create'
import UpdateUserDto from './../dtos/user/user.update'

export default class UserRoutes {
    private router = Router();
    public path: string = '/users'
    private authJwt = new AuthJwt();
    private userController = new UserController();
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes(): void {
        this.router.post('/login', Validation(UpdateUserDto), this.userController.login)

        this.router.post('/register', Validation(CreateUserDto), this.userController.register)

        this.router.get('/me', this.authJwt.verifyToken(false), this.userController.getMe)

        this.router.patch('/me', Validation(UpdateUserDto), this.authJwt.verifyToken(false), this.userController.updateMe)

        this.router.delete('/:id', this.authJwt.verifyToken(false), this.authJwt.protect, this.userController.destroy)

        this.router.patch('/change-password', Validation(UpdateUserDto), this.authJwt.verifyToken(true), this.userController.changePassword)
    }

    public getRouter(): Router {
        return this.router;
    }

}

