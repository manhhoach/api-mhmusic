import { Request, Response, NextFunction } from 'express'
import * as albumService from './../services/album'
import { responseSuccess, responseError } from './../helper/response'
import { getPagination, getPagingData } from './../helper/pagination'
import tryCatch from './../helper/tryCatch'
import { IAlbum } from './../models/album'
import { IAlbumSong } from './../models/album_song'
import sequelize from 'sequelize'
import * as albumSongService from './../services/album_song'

export const getAll = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    let type = 10;
    let condition: any = {};
    if (req.query.type && res.locals.user) {
        type = parseInt(req.query.type as string);
        condition.userId = res.locals.user.id;
    }
    condition.type = type;

    if (req.query.name) {
        condition.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('album.name')), 'LIKE', '%' + req.query.name.toString().toLowerCase() + '%')
    }
    if (req.query.year) {
        condition.year = parseInt(req.query.year as string)
    }

    let pagination = getPagination(parseInt(req.query.page_index as string), parseInt(req.query.page_size as string))
    let albums = await albumService.getAll(condition, pagination)
    let data = getPagingData(albums, parseInt(req.query.page_index as string), pagination.limit)
    res.json(responseSuccess(data));
})

export const create = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let album: IAlbum = {
        ...req.body,
        type: res.locals.user.type,
        userId: res.locals.user.id
    }
    let data = await albumService.create(album);
    res.json(responseSuccess(data));
})

export const update = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    let album = {
        name: req.body.name,
        year: req.body.year
    };
    let result = await albumService.update(album, { id: req.params.id, userId: res.locals.user.id });
    if (result[0] === 1) {
        let data = await albumService.getOne({ id: req.params.id });
        res.json(responseSuccess(data));
    }
    else {
        res.json(responseError("UPDATE FAILED"))
    }

})

export const destroy = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    let result = await Promise.all(
        req.body.ids.map(async (id: number) => await albumService.destroy({ id: id, userId: res.locals.user.id }))
    )
    if (result.includes(1)) {
        res.json(responseSuccess("DELETE SUCCESS"));
    }
    else {
        res.json(responseError("DELETE FAILED"))
    }
})

export const getOne = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let data;
    if (res.locals.user && req.query.type=="0") {
        data = await albumSongService.getOne({
            album_song: { albumId: parseInt(req.params.albumId) },
            album: { userId: res.locals.user.id }
        })
    }
    else {
        data = await albumSongService.getOne({
            album_song: { albumId: parseInt(req.params.albumId) },
            album: { type: 10 }
        })
    }
    if (data.length > 0) {
        let album = data[0].album.dataValues;
        let songs = data.map((ele: any) => ele.song.dataValues)
        res.json(responseSuccess({ ...album, songs }));
    }
    else {
        res.json(responseSuccess([]))
    }

})

export const addSong = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let check = await checkAlbum(req.body.albumId, res.locals.user.id);
    if (check) {
        let abs: IAlbumSong = { ...req.body };
        let data = await albumSongService.create(abs)
        res.json(responseSuccess(data));
    }
    else {
        res.json(responseError("USER OR ALBUM IS NOT EXIST"))
    }

})

export const removeSong = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let check = await checkAlbum(req.body.albumId, res.locals.user.id);
    if (check) {
        let condition: IAlbumSong = { ...req.body };
        let data = await albumSongService.destroy(condition)
        if (data === 1) {
            res.json(responseSuccess("REMOVE SUCCESS"));
        }
        else {
            res.json(responseError("REMOVE FAILED"))
        }
    }
    else {
        res.json(responseError("USER OR ALBUM IS NOT EXIST"))
    }
})

const checkAlbum = async (albumId: number, userId: number) => {
    return albumService.getOne({ id: albumId, userId: userId })
}