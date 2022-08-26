import { Request, Response, NextFunction } from 'express'
import * as songService from '../services/song'
import { responseSuccess, responseError } from '../helper/response'
import { getPagination, getPagingData } from '../helper/pagination'
import tryCatch from '../helper/tryCatch'
import sequelize from 'sequelize'
import getUrl from '../helper/getUrlTracks'


import redis from './../db/connectRedis';
import macaddress from 'macaddress';


export const getAll = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let condition: any = {};
    if (req.query.name) {
        condition.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('song.name')), 'LIKE', '%' + req.query.name.toString().toLowerCase() + '%')
    }
    if (req.query.year) {
        condition.year = parseInt(req.query.year as string)
    }
    if (req.query.categoryId) {
        condition.categoryId = parseInt(req.query.categoryId as string)
    }
    let pagination = getPagination(parseInt(req.query.page_index as string), parseInt(req.query.page_size as string))
    let data = await songService.getAll(condition, pagination, true, true)
    let response = getPagingData(data, parseInt(req.query.page_index as string), pagination.limit)

    res.json(responseSuccess(response));
})

export const getOne = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    let data = await songService.getOne({ id: parseInt(req.params.id) }, true, true)

    res.json(responseSuccess(data));
})

export const create = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let data: any = {};
    if (req.body.songId && !req.body.url) {
        let url = await getUrl(req.body.songId)
        if (url.success === true) {
            data = {
                ...req.body, url: `http://api.mp3.zing.vn/api/streaming/audio/${req.body.songId}/320`
            }
        }
        else {
            return res.json(responseError("Song id or Song does not exist"))
        }
    }
    else {
        data = { ...req.body }
    }
    let song: any = await songService.create(data)
    await redis.set(`songId:${song.id}`, song.view);

    res.json(responseSuccess(song));
})


export const update = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let data: any = {};
    if (req.body.songId && !req.body.url) {
        let url = await getUrl(req.body.songId)
        if (url.success === true) {
            data = {
                ...req.body, url: `http://api.mp3.zing.vn/api/streaming/audio/${req.body.songId}/320`
            }
        }
        else {
            return res.json(responseError("Song id or Song does not exist"))
        }
    }
    else {
        data = { ...req.body }
    }
    let result = await songService.update(data, { id: parseInt(req.params.id) })
    if (result[0] === 1) {
        let song = await songService.getOne({ id: parseInt(req.params.id) })
        res.json(responseSuccess(song));
    }
    else {
        res.json(responseError("UPDATE FAILED"))
    }

})


export const destroy = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let result = await Promise.all(
        req.body.ids.map(async (id: number) => await songService.destroy({ id: id }))
    )
    if (result.includes(1)) {
        res.json(responseSuccess("DELETE SUCCESS"));
    }
    else {
        res.json(responseError("DELETE FAILED"))
    }
})

export const getRecentSongs = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let recentSongsId = res.locals.user.recentSongs.split(';');
    let recentSongs = await Promise.all(
        recentSongsId.map(async (id: string) => {
            let song: any = await songService.getOne({ id: parseInt(id) }, false, false);
            return song?.dataValues;
        })
    )
    res.json(responseSuccess(recentSongs))
})


export const updateView = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const songId = `songId:${req.params.id}`;
    const macAddress = `macAddress:${await macaddress.one()}`;

    const isOK = await redis.set(`${macAddress}-${songId}`, 'MH-MUSIC','EX', 60*3, 'NX'); 
    let data=null;
    if(isOK==='OK')
    {
       data= await redis.incrby(songId, 1);
    }
    res.json(responseSuccess(data))


})


// import sequelize2 from './../db/config';
// let models = sequelize2.models;
// let songs = await models.song.findAll();
// await Promise.all(songs.map(async (song: any) => {
//     return await redis.set(`songId:${song.id}`, song.view);
// }))
