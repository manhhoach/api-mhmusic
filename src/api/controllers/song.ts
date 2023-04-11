import Song from './../entities/song';
import BaseController from './base';
import tryCatch from '../helpers/tryCatch';
import { responseSuccess, responseError } from '../helpers/response';
import { CONSTANT_MESSAGES } from "../helpers/constant";
import { NextFunction, Request, Response } from "express";
import SongService from './../services/song';
import { handleFileName } from '../helpers/handleFileName';


declare global {
    namespace Express {
        interface Request {
            file: any
        }
    }
}

export default class SongController extends BaseController<Song> {

    constructor(private songService: SongService) {
        super(songService);
    }

    getDetailById = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let data = await this.songService.getDetailById(req.params.id);
        if (data === null)
            return res.status(404).json(responseError(CONSTANT_MESSAGES.DATA_NOT_FOUND));
        res.status(200).json(responseSuccess(data));
    });

    getRecentSongs = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let songs = await this.songService.getRecentSongs(res.locals.user.id);
        songs = songs.filter(song => song !== null);
        res.status(200).json(responseSuccess(songs));
    });
    updateRecentSongs = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let result = await this.songService.updateRecentSongs(res.locals.user.id, req.body.songId);
        if (result === CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY)
            return res.status(201).json(responseSuccess(result));
        res.status(400).json(responseError(result));
    });

    updateViews = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let result = await this.songService.updateViews(req.params.id);
        if (result !== null)
            return res.status(201).json(responseSuccess(result));
        res.status(400).json(responseError(CONSTANT_MESSAGES.TOO_MANY_REQUESTS));
    });

    getChart = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let result = await this.songService.getChartData();
        res.status(200).json(responseSuccess(result));
    });

    upload = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file.originalname.endsWith('.mp3')) {
            return res.status(400).json(responseError(CONSTANT_MESSAGES.WRONG_FORMAT));
        }
        let fileName = `${handleFileName(req.file.originalname)}.mp3`;
        let url = await this.songService.sendToAwsS3(req.file.buffer, fileName);
        res.status(201).json(responseSuccess(url));
    });
}