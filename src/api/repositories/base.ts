import {
    DeleteResult, Repository, getRepository, Entity, ObjectLiteral,
    FindOneOptions, FindOptionsWhere, FindOptionsOrder
} from "typeorm";
import { AppDataSource } from './../databases/postgres'

export default class BaseRepository<T extends ObjectLiteral> {
    private repository: Repository<T>;

    constructor(entity: typeof Entity) {
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

    getById(condition: FindOptionsWhere<T> | FindOptionsWhere<T>[] | undefined): Promise<T | null> {
        return this.repository.findOne({
            where: condition
        })
    }

    save(entity: T): Promise<T> {
        return this.repository.save(entity);
    }

    create(obj: T): Promise<T> {
        let e = this.repository.create(obj);
        return this.repository.save(e);
    }

    update(entity: T): Promise<T> {
        return this.repository.save(entity);
    }

    delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}
