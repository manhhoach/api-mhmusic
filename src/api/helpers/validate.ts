import { validate, ValidatorOptions } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import AppError from './appError';

export default (objValidation: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToClass(objValidation, req.body);
        
        const validationOptions: ValidatorOptions  = {
            whitelist: true, // remove any properties not defined in the DTO
            forbidNonWhitelisted: true, // throw an error if any properties are not in the DTO
           // skipMissingProperties: true // skip validation for missing properties
          };
        const errors = await validate(dto, validationOptions);

        if (errors.length > 0) {
            let message: any = errors[0].constraints;
            message = message[Object.keys(message)[0]];
            return next(new AppError(400, message));
        }
        next();
    };
};