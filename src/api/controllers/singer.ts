import Singer from './../entities/singer'
import BaseController from './base'
import { getPagination, getPagingData } from "../helpers/pagination";
import tryCatch from '../helpers/tryCatch';
import { NextFunction, Request, Response } from "express";
import { responseSuccess, responseError } from '../helpers/response';
import { Like, FindOperator } from "typeorm";
import QueryOptions from '../helpers/queryOptions';

interface conditionSinger {
    name?: FindOperator<string>
}

export default class SingerController extends BaseController<Singer> {
    
    getAllAndCount = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let page_index = parseInt(req.query.page_index as string) || 1, page_size = parseInt(req.query.page_size as string) || 6;
    
        let condition: conditionSinger = {}
        if (req.query.name) {
            condition.name = Like(`%${req.query.name}%`)
        }
        const queryOptions = new QueryOptions(page_index, page_size, condition, req.query.order as string)
        
        let data = await this.service.getAllAndCount(queryOptions.condition, queryOptions.limit, queryOptions.offset, queryOptions.order)
        const response = getPagingData(data, page_index, queryOptions.limit)

        res.status(200).json(responseSuccess(response))
    })
}