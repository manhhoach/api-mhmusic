import BaseRepository from "../repositories/base";
import {
  DeleteResult, ObjectLiteral,
  UpdateResult, FindOptionsWhere, FindOptionsOrder
} from "typeorm";

export default class BaseService<T extends ObjectLiteral> {
  private repository: BaseRepository<T>;
  private entity: any;
  constructor(entity: any) {
    this.entity = entity;
    this.repository = new BaseRepository(entity);
  }

  getAllAndCount(condition: FindOptionsWhere<T> | FindOptionsWhere<T>[] | undefined = undefined, limit: number = 0, offset: number = 0, order: FindOptionsOrder<T> | undefined): Promise<[T[], number]> {
    return this.repository.getAllAndCount(condition, limit, offset, order);
  }

  getById(id: string): Promise<T | null> {
    return this.repository.getById(id);
  }

  save(data: T): Promise<T> {
    let entitySave = new this.entity()
    entitySave = Object.assign(entitySave, data)
    return this.repository.save(entitySave);
  }

  update(condition: any, entity: T): Promise<UpdateResult> {
    return this.repository.update(condition, entity);
  }

  delete(condition: string | string[] | Object): Promise<DeleteResult> {
    return this.repository.delete(condition);
  }
}