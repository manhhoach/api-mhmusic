import Singer from './../entities/singer';
import BaseService from './base';
import SingerRepository from '../repositories/singer';

export default class SingerService extends BaseService<Singer>{
    constructor(private singerRepository: SingerRepository){
        super(singerRepository);
    }
    getByName(name: string){
        return this.singerRepository.getAll({name: name});
    }
}