import BaseRepository from "../repositories/base";
import { DeleteResult, ObjectLiteral, UpdateResult } from "typeorm";
import { CONSTANT_MESSAGES } from "../helpers/constant";

export default class BaseService<T extends ObjectLiteral> {

  protected repository: BaseRepository<T>;
  private entity: any;

  constructor(entity: any) {
    this.entity = entity;
    this.repository = new BaseRepository(entity);
  }

  getAllAndCount(limit: number, offset: number, condition: any, order: any) {
    return this.repository.getAllAndCount(limit, offset, condition, order);
  }

  getById(id: string): Promise<T | null> {
    return this.repository.getById(id);
  }

  createAndSave(entity: any): Promise<T[]> {
    return this.repository.createAndSave(entity);
  }

  save(data: T): Promise<T> {
    let entitySave = new this.entity()
    entitySave = Object.assign(entitySave, data)
    return this.repository.save(entitySave);
  }

  update(condition: any, entity: T): Promise<UpdateResult> {
    return this.repository.update(condition, entity)
  }

  async findByIdAndUpdate(id: string, obj: any): Promise<T | null> {
    let data = await this.repository.getById(id)
    if (!data) {
      return null
    }
    let entity = Object.assign(data, obj)
    return this.repository.save(entity)
  }

  delete(condition: string | string[] | Object): Promise<DeleteResult> {
    return this.repository.delete(condition);
  }

  async findByIdAndDelete(id: string): Promise<null | string> {
    let data = await this.repository.delete(id)
    if (data.affected === 1)
      return null;
    return CONSTANT_MESSAGES.DELETE_FAILED
  }
}