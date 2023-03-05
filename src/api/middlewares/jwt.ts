import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import UserRepository from '../repositories/user';
import AppError from './../helpers/appError';
import { CONSTANT_MESSAGES } from './../helpers/constant'

export default class AuthJwt {
    private userRepository = new UserRepository()
    public signToken = (id: string) => {
        return jwt.sign({ id }, process.env.SECRET_KEY as string, { expiresIn: '7d' })
    }

    public verifyToken = (getPassword: boolean=false) =>{
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                let token = req.headers.authorization?.split(' ')[1];
                if (token) {
                    let decoded: any = jwt.verify(token, process.env.SECRET_KEY as string);
                    let user = await this.userRepository.findOne({ id: decoded.id }, getPassword)
                    if (user) {
                        res.locals.user = user;
                        return next();
                    }
                    return next(new AppError(404, CONSTANT_MESSAGES.USER_NOT_FOUND))
                }
                next(new AppError(400, CONSTANT_MESSAGES.TOKEN_NOT_PROVIDED))
            }
            catch (error) {
                next(new AppError(400, CONSTANT_MESSAGES.INVALID_TOKEN))
            }
        }
    } 
}
