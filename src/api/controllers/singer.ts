import Singer from './../entities/singer'
import BaseController from './base'
import SingerService from '../services/singer'
import tryCatch from '../helpers/tryCatch';
import { NextFunction, Request, Response } from "express";

export default class SingerController extends BaseController<Singer> {
    constructor(private singerService: SingerService){
        super(singerService)
    }
    getByName = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let data= await this.singerService.getByName("bảo thy")
        res.status(200).json(data)
    })
}