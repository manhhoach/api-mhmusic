import Singer from './../entities/singer'
import BaseRepository from './base'


export default class SingerRepository extends BaseRepository<Singer>{
    constructor(){
        super(Singer)
    }
}