import { Request, Response, NextFunction } from 'express'
import UserService from './../services/user'
import tryCatch from '../helpers/tryCatch';
import { responseSuccess } from '../helpers/response';
import User from './../entities/user'
import BaseController from './base'

export default class UserController extends BaseController<User>{
    constructor(private userService: UserService){
        super(userService)
    }

    getMe(req: Request, res: Response, next: NextFunction) {
        res.status(200).json(responseSuccess(res.locals.user))
    }

    updateMe = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let user = await this.userService.findByIdAndUpdate(res.locals.user.id, req.body);
        res.status(201).json(responseSuccess(user))
    })

    register = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let user = await this.userService.register(req.body)
        res.status(201).json(responseSuccess(user))
    })

    login = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let user = await this.userService.login(req.body)
        res.status(200).json(responseSuccess(user))
    })

    changePassword = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let result = await this.userService.changePassword(res.locals.user, req.body);
        res.status(201).json(responseSuccess(result))
    })

    destroy = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        let result = await this.userService.findByIdAndDelete(id);
        res.status(200).json(responseSuccess(result))
    })
}

