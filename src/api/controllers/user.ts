import { Request, Response, NextFunction } from 'express'
import UserService from './../services/user'
import tryCatch from '../helpers/tryCatch';
import { responseSuccess } from '../helpers/response';
import { validate } from 'class-validator';
import AppError from './../helpers/appError';


export default class UserController {
    private userService = new UserService()

    public getMe(req: Request, res: Response, next: NextFunction) {
        res.status(200).json(responseSuccess(res.locals.user))
    }

    public updateMe = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let { name } = req.body;
        let user = await this.userService.update(res.locals.user.id, name);
        res.status(201).json(responseSuccess(user))

    })

    public register = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        // let createUserDto=new IUserCreate(req.body)
        // const errors = await validate(req.body)
        // if (errors.length > 0) {
        //     console.log();
            
        // }
        let { email, password, name } = req.body;
        let user = await this.userService.register(name, email, password)
        res.status(201).json(responseSuccess(user))
    })

    public login = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let { email, password } = req.body;
        // validate email and password and use next function


        let user = await this.userService.login(email, password)
        res.status(200).json(responseSuccess(user))
    })

    public changePassword = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let { oldPassword, newPassword } = req.body;
        let result = await this.userService.changePassword(res.locals.user, oldPassword, newPassword);
        res.status(201).json(responseSuccess(result))

    })
}

