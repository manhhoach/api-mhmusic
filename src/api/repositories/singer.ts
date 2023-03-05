import Singer from './../entities/singer'
import { AppDataSource } from './../databases/postgres'
import CreateSingerDto from '../dtos/singer/singer.create'
import UpdateSingerDto from '../dtos/singer/singer.update'


export default class SingerRepository {
    private singerRepository = AppDataSource.getRepository(Singer)

    public async create(user: CreateSingerDto) {
        let data = new Singer()
        data.name = user.name;
        return this.singerRepository.save(data)
    }

    public async findOne(condition: { id: string }) {
        return this.singerRepository.findOneBy(condition)
    }

    public async update(condition: { id: string }, singer: UpdateSingerDto) {
        return this.singerRepository.update(condition, singer)
    }


    public async destroy(id: string) {
        return this.singerRepository.delete(id)
    }
}