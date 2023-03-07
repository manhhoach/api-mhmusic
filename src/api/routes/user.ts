import { Router } from 'express'
import UserController from './../controllers/user'
import AuthJwt from './../middlewares/jwt'
import Validation from './../helpers/validate'
import User from "./../entities/user"
import CreateUserDto from './../dtos/user/user.create'
import UpdateUserDto from './../dtos/user/user.update'
import LoginUserDto from './../dtos/user/user.login'
import ChangePasswordDto from './../dtos/user/user.change.password'

export default class UserRoutes {
    private router = Router();
    public path: string = '/users'
    private authJwt = new AuthJwt();
    private userController = new UserController(User);
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes(): void {
        this.router.post('/login', Validation(LoginUserDto), this.userController.login)

        this.router.post('/register', Validation(CreateUserDto), this.userController.register)

        this.router.get('/me', this.authJwt.verifyToken(false), this.userController.getMe)

        this.router.patch('/me', Validation(UpdateUserDto), this.authJwt.verifyToken(false), this.userController.updateMe)

        this.router.delete('/:id', this.authJwt.verifyToken(false), this.authJwt.protect, this.userController.findByIdAndDelete)

        this.router.patch('/change-password', Validation(ChangePasswordDto), this.authJwt.verifyToken(true), this.userController.changePassword)
    }

    public getRouter(): Router {
        return this.router;
    }

}

