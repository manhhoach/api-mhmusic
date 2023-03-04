import {Request, Response, NextFunction} from 'express'

export default function tryCatch(func: any){
    return (req: Request, res: Response, next: NextFunction)=>{ 
        func(req, res, next).catch((err: Error)=>{
            next(err)
        })
    }
}