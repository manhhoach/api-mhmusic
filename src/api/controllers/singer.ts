import Singer from './../entities/singer'
import BaseController from './base'
import SingerService from '../services/singer'

export default class SingerController extends BaseController<Singer> {
    constructor(private singerService: SingerService) {
        super(singerService)
    }
}