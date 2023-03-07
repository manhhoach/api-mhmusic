import Singer from './../entities/singer'
import BaseService from './base'

export default class SingerService extends BaseService<Singer>{
    constructor(){
        super(Singer)
    }
}