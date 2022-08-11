import { Request, Response, NextFunction } from 'express'
import * as categoryService from './../services/category'
import { responseSuccess, responseError } from './../helper/response'
import { getPagination, getPagingData } from './../helper/pagination'
import tryCatch from './../helper/tryCatch'
import { ICategory } from './../models/category'

export const getAll = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let categories = await categoryService.getAll({});
    res.json(responseSuccess(categories));
})


export const create = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let category: ICategory = req.body;
    let data = await categoryService.create(category);
    res.json(responseSuccess(data));
})

export const update = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    let category: ICategory = req.body;
    let result = await categoryService.update(category, {id: req.params.id});
    if(result[0]===1)
    {
        let data= await categoryService.getOne({id: req.params.id});
        res.json(responseSuccess(data));
    }
    else
    {
        res.json(responseError("UPDATE FAILED"))
    }
    
})

export const destroy = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    
    let result = await Promise.all( 
        req.body.ids.map( async(id: number) => await categoryService.destroy({id: id}) )
    )
    if(result.includes(1))
    {
        res.json(responseSuccess("DELETE SUCCESS"));
    }
    else
    {
        res.json(responseError("DELETE FAILED"))
    }
})