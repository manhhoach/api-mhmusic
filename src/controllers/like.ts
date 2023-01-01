import { Request, Response, NextFunction } from 'express'
import * as likeService from './../services/like'
import { responseSuccess, responseError } from './../helper/response'
import tryCatch from './../helper/tryCatch'
import { ILike } from './../models/like'

import sequelize from '../db/connectMysql'
let models=sequelize.models;

export const countLike = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let condition = { ...req.query };
    let count = await likeService.count(condition);
    res.json(responseSuccess(count));
})

export const create = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let like: ILike = {
        ...req.body,
        userId: res.locals.user.id
    };
    let data = await likeService.create(like);
    res.json(responseSuccess(data));
})

export const destroy = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    let condition = {
        userId: res.locals.user.id,
        ...req.query
    }
    let result = await likeService.destroy(condition);
    if (result === 1) {
        res.json(responseSuccess("UNLIKE SUCCESS"));
    }
    else {
        res.json(responseError("UNLIKE FAILED"))
    }
})

const strategy: any = {
    ALBUM: models.album,
    SINGER: models.singer,
    SONG: models.song,
}

export const getLiked = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let liked = await likeService.getByCondition({
        type: req.query.type,
        userId: res.locals.user.id
    })
    let data = await Promise.all(
        liked.map(async (ele: any) => {
            return await strategy[req.query.type as string].findOne({where: { id: ele.varId}});
        })
    )
    res.json(responseSuccess(data))
    
})