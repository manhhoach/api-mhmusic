import Singer from './../entities/singer'
import BaseController from './base'


export default class SingerController extends BaseController<Singer> {
    constructor(){
        super(Singer)
    }
    
}