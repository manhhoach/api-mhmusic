import User from './../entities/user'
import BaseRepository from './base'



export default class UserRepository extends BaseRepository<User>{

    constructor(){
        super(User)
    }
    
    findOne(condition: { id?: string, email?: string }, requiredPassword: boolean = false, cache?: number) {
        let queryBuilder = this.repository.createQueryBuilder('user')
            .where("user.id = :id", { id: condition.id })
            .orWhere("user.email = :email", { email: condition.email })
            .cache(cache)

        if (requiredPassword)
            queryBuilder.addSelect('user.password')
        return queryBuilder.getOne()
    }
    
}