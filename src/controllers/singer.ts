import { Request, Response, NextFunction } from 'express'
import * as singerService from './../services/singer'
import { responseSuccess, responseError } from './../helper/response'
import { getPagination, getPagingData } from './../helper/pagination'
import tryCatch from './../helper/tryCatch'
import { ISinger } from './../models/singer'
import sequelize from 'sequelize'

export const getAll = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let condition: any={};
    if(req.query.name)
    {
        condition.fullName = sequelize.where(sequelize.fn('LOWER', sequelize.col('singer.fullName')), 'LIKE', '%' + req.query.name.toString().toLowerCase() + '%')
    }
    let singers = await singerService.getAll(condition);
    res.json(responseSuccess(singers));
})

export const getOne = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let singers = await singerService.getOne({id: req.params.id});
    res.json(responseSuccess(singers));
})

export const create = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let singer: ISinger = req.body;
    let data = await singerService.create(singer);
    res.json(responseSuccess(data));
})

export const update = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    let singer: ISinger = req.body;
    let result = await singerService.update(singer, {id: req.params.id});
    if(result[0]===1)
    {
        let data= await singerService.getOne({id: req.params.id});
        res.json(responseSuccess(data));
    }
    else
    {
        res.json(responseError("UPDATE FAILED"))
    }
    
})

export const destroy = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    
    let result = await Promise.all( 
        req.body.ids.map( async(id: number) => await singerService.destroy({id: id}) )
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