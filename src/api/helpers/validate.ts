import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import AppError from './appError'

export default (objValidation: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const obj = new objValidation(req.body)
        const errors = await validate(obj)
        if (errors.length > 0) {
            let message: any = errors[0].constraints
            message = message[Object.keys(message)[0]]
            return next(new AppError(400, message));
        }
        next()
    }
}