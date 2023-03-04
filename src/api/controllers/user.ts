import { Request, Response, NextFunction } from 'express'
import UserService from './../services/user'
import tryCatch from '../helpers/tryCatch';
import { responseSuccess } from '../helpers/response';

export default class UserController {
    private userService = new UserService()
    public async getMe(req: Request, res: Response, next: NextFunction) {

    }

    public register = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let { email, password, name } = req.body;
        let user = await this.userService.register(name, email, password)
        console.log('user in controller', user);
        
        res.status(201).json(responseSuccess(user))
    })
}

