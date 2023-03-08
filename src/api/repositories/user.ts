import User from './../entities/user'
import BaseRepository from './base'
import {UpdateResult} from "typeorm"
import UpdateUserDto from "./../dtos/user/user.update"


export default class UserRepository extends BaseRepository<User>{

    constructor(){
        super(User)
    }
    
    findOne(condition: { id?: string, email?: string }, requiredPassword: boolean = false) {
        let queryBuilder = this.repository.createQueryBuilder('user')
            .where("user.id = :id", { id: condition.id })
            .orWhere("user.email = :email", { email: condition.email })

        if (requiredPassword)
            queryBuilder.addSelect('user.password')
        return queryBuilder.getOne()
    }

    update(condition: any, entity: UpdateUserDto): Promise<UpdateResult> {
        return this.repository.update(condition, entity);
    }
    
}