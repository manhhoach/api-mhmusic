import { Request, Response, NextFunction } from 'express'
import UserService from './../services/user'
import tryCatch from '../helpers/tryCatch';
import { responseSuccess } from '../helpers/response';

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
        let { email, password, name } = req.body;
        let user = await this.userService.register(name, email, password)
        res.status(201).json(responseSuccess(user))
    })

    public login = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let { email, password } = req.body;
        let user = await this.userService.login(email, password)
        res.status(200).json(responseSuccess(user))
    })

    public changePassword = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let { oldPassword, password } = req.body;
        let result = await this.userService.changePassword(res.locals.user, oldPassword, password);
        res.status(201).json(responseSuccess(result))
    })

    public destroy = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        let result = await this.userService.destroy(id);
        res.status(200).json(responseSuccess(result))
    })
}

