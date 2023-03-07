import {
    DeleteResult, Repository, ObjectLiteral,
    FindOptionsWhere, FindOptionsOrder, UpdateResult
} from "typeorm";
import { AppDataSource } from './../databases/postgres'

export default class BaseRepository<T extends ObjectLiteral> {
    protected repository: Repository<T>;
    
    constructor(entity: any) {
       
        this.repository = AppDataSource.getRepository(entity);
        // this.repository = getRepository(entity);
    }

    getAllAndCount(condition: FindOptionsWhere<T> | FindOptionsWhere<T>[] | undefined, limit: number, offset: number, order: FindOptionsOrder<T> | undefined) {
        return this.repository.findAndCount({
            where: condition,
            take: limit,
            skip: offset,
            order: order
        })
    }

    getById(id: string): Promise<T | null> {
        let condition: any = { id: id }
        return this.repository.findOne({
            where: condition
        })
    }

    save(data: T): Promise<T> {
        return this.repository.save(data);
    }

    update(condition: any, entity: T): Promise<UpdateResult> {
        return this.repository.update(condition, entity);
    }

    delete(condition: any): Promise<DeleteResult> {
        return this.repository.delete(condition);
    }
}
