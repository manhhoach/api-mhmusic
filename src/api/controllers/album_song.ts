import AlbumSong from './../entities/album_song';
import BaseController from './base';
import AlbumSongService from '../services/album_song';
import tryCatch from '../helpers/tryCatch';
import { responseSuccess } from '../helpers/response';
import { PAGINATION_DATA } from "../helpers/constant";
import { Request, Response, NextFunction } from 'express';
import QueryOptions from '../helpers/queryOptions';
import { getPagingData } from '../helpers/pagination';


export default class AlbumSongController extends BaseController<AlbumSong> {
    constructor(private albumSongService: AlbumSongService) {
        super(albumSongService);
    }
    getDetailById = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
        let page_index = parseInt(req.query.page_index as string) || PAGINATION_DATA.DEFAULT_PAGE_INDEX;
        let page_size = parseInt(req.query.page_size as string) || PAGINATION_DATA.DEFAULT_PAGE_SIZE;
        let queryOptions = new QueryOptions(page_index, page_size);
        let data = await this.albumSongService.getDetailById(req.params.id, queryOptions.limit, queryOptions.offset);
        let response = getPagingData(data, page_index, queryOptions.limit);
        res.status(200).json(responseSuccess(response));
    });

}