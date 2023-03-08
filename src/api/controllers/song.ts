import Song from './../entities/song'
import Singer from '../entities/singer';
import BaseController from './base'
import tryCatch from '../helpers/tryCatch';
import { responseSuccess, responseError } from '../helpers/response';
import { CONSTANT_MESSAGES } from "../helpers/constant";
import { NextFunction, Request, Response } from "express";
import SingerService from './../services/singer';


export default class SongController extends BaseController<Song> {

    private singerService = new SingerService(Singer);
    
    
}