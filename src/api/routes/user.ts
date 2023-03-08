import { Router } from 'express'
import UserController from './../controllers/user'
import AuthJwt from './../middlewares/jwt'
import Validation from './../helpers/validate'
import CreateUserDto from './../dtos/user/user.create'
import UpdateUserDto from './../dtos/user/user.update'
import LoginUserDto from './../dtos/user/user.login'
import ChangePasswordDto from './../dtos/user/user.change.password'
import BaseRoutes from './base'

export default class UserRoutes extends BaseRoutes {

    path = '/users'
    private authJwt = new AuthJwt();
    private userController = new UserController();
    constructor() {
        super()
        this.initializeRoutes()
    }
    initializeRoutes(): void {
        this.getRouter().post('/login', Validation(LoginUserDto), this.userController.login)

        this.getRouter().post('/register', Validation(CreateUserDto), this.userController.register)

        this.getRouter().get('/me', this.authJwt.verifyToken(false), this.userController.getMe)

        this.getRouter().patch('/me', Validation(UpdateUserDto), this.authJwt.verifyToken(false), this.userController.updateMe)

        this.getRouter().delete('/:id', this.authJwt.verifyToken(false), this.authJwt.protect, this.userController.findByIdAndDelete)

        this.getRouter().patch('/change-password', Validation(ChangePasswordDto), this.authJwt.verifyToken(true), this.userController.changePassword)
    }

}

