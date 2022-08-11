import jwt from 'jsonwebtoken'
import { responseError } from '../helper/response';
import { Request, Response, NextFunction } from 'express'
import * as userService from './../services/user'

interface userInfo {
    id: number;
    email: string;
}

export function signToken(user: userInfo) {
    return jwt.sign(user, process.env.SECRET_KEY as string, { expiresIn: '7d' })
}

export async function decodeToken(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.headers.authorization?.split(' ')[1];
        if (token) {
            let decoded: any = jwt.verify(token, process.env.SECRET_KEY as string);
            let user = await userService.getOne({ id: decoded.id, email: decoded.email }, true)
            if (user) {
                res.locals.user = user;
                next();
            }
            else {
                res.json(responseError("User is not found"))
            }

        }
        else {
            res.json(responseError("Invalid or expired token provided!"))
        }

    }
    catch (err) {
        res.json(responseError("Invalid or expired token provided!"))
    }
}

export async function protect(req: Request, res: Response, next: NextFunction) {
    if (res.locals.user.type === 10)
        next();
    else
        res.json(responseError("You can not access this route"))
}

export async function checkTokenExistOrNot(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.headers.authorization?.split(' ')[1];
        let decoded: any = jwt.verify(token as string, process.env.SECRET_KEY as string);
        let user = await userService.getOne({ id: decoded.id, email: decoded.email }, true)
        if (user) {
            res.locals.user = user;  
        }
        next();
    }
    catch (err) {
        next()
    }
}