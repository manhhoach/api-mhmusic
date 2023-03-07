import { NextFunction, Request, Response } from "express";
import BaseService from "../services/base";
import { ObjectLiteral } from "typeorm";
import tryCatch from '../helpers/tryCatch';
import { responseSuccess, responseError } from '../helpers/response';
import { CONSTANT_MESSAGES } from "../helpers/constant";
import { getPagingData } from "../helpers/pagination";
import { PAGINATION_DATA } from "../helpers/constant";
import QueryOptions from "./../helpers/queryOptions"

export default class BaseController<T extends ObjectLiteral> {
    protected service: BaseService<T>;

    constructor(entity: any) {
        this.service = new BaseService(entity);
    }

    getAllAndCount = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

        let page_index = parseInt(req.query.page_index as string) || PAGINATION_DATA.DEFAULT_PAGE_INDEX;
        let page_size = parseInt(req.query.page_size as string) || PAGINATION_DATA.DEFAULT_PAGE_SIZE;
        let queryOptions = new QueryOptions(page_index, page_size, req.query)

        const data = await this.service.getAllAndCount(queryOptions.limit, queryOptions.offset, queryOptions.condition, queryOptions.order);
        const response = getPagingData(data, page_index, queryOptions.limit)
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

    createAndSave = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        const data = await this.service.createAndSave(req.body);
        res.status(201).json(responseSuccess(data));
    })

    findByIdAndUpdate = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        let data = await this.service.findByIdAndUpdate(id, req.body)
        res.status(201).json(responseSuccess(data));
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

    findByIdAndDelete = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let data = await this.service.findByIdAndDelete(req.params.id)
        if (typeof data === 'string')
            return res.status(404).json(responseError(data));
        res.status(200).json(responseSuccess(data));
    })
}