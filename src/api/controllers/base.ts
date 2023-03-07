import { NextFunction, Request, Response } from "express";
import BaseService from "../services/base";
import { ObjectLiteral, Like } from "typeorm";
import { getPagination, getPagingData } from "../helpers/pagination";
import tryCatch from '../helpers/tryCatch';
import { responseSuccess, responseError } from '../helpers/response';
import { CONSTANT_MESSAGES } from "../helpers/constant";

export default class BaseController<T extends ObjectLiteral> {
    protected service: BaseService<T>;

    constructor(entity: any) {
        this.service = new BaseService(entity);
    }

    getAllAndCount = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let page_index = parseInt(req.query.page_index as string) || 1, page_size = parseInt(req.query.page_size as string) || 6;
        let order: any = { };
        if (req.query.order) {
            let sort = req.query.order as string;
            let fieldSort;
            if (sort.startsWith('-') || sort.startsWith('+')) {
                fieldSort = sort.slice(1, sort.length)
                order[fieldSort] = sort[0] === '-' ? "DESC" : "ASC";
            }
            else
                order[sort]="ASC"
        }
        else
            order={createdAt: "DESC"}
        
        
        let { limit, offset } = getPagination(page_index, page_size)
        const data = await this.service.getAllAndCount({}, limit, offset, order);
        const response=getPagingData(data, page_index, limit)
        
        res.status(200).json(responseSuccess(response))
    })

    getById = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

        const id = req.params.id;
        const data = await this.service.getById(id);
        if (!data) {
            return res.status(404).json(responseError(data));
        }
        res.status(200).json(responseSuccess(data))

    })

    create = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        const data = await this.service.save(req.body);
        res.status(201).json(responseSuccess(data));
    })

    update = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        let data = await this.service.getById(id)
        if (!data) {
            return res.status(404).json(responseError(data));
        }
        let entity = Object.assign(data, req.body)
        entity = await this.service.save(entity)
        res.status(201).json(responseSuccess(entity));
    })

    delete = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let data = await this.service.getById(req.params.id)
        if (!data)
            return res.status(404).json(responseError(CONSTANT_MESSAGES.DELETE_FAILED));
        await this.service.delete(req.params.id)
        //if(data.affected===1)
        return res.status(200).json(responseSuccess(null));
        //return res.status(400).json(responseError(CONSTANT_MESSAGES.DELETE_FAILED));   

    })
}