import { responseError} from './../helper/response'
import {Request, Response, NextFunction} from 'express'

export default function tryCatch(func: Function){
    return (req: Request, res: Response, next: NextFunction)=>{ 
        func(req, res, next).catch((err: any)=>{
            res.json(responseError(err))
        })
    }
}
