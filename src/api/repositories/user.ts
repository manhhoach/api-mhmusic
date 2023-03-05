import User from './../entities/user'
import { AppDataSource } from './../databases/postgres'
import CreateUserDto from '../dtos/user/user.create'
import UpdateUserDto from '../dtos/user/user.update'


export default class UserRepository {
    private userRepository = AppDataSource.getRepository(User)

    public async register(user: CreateUserDto) {
        let data = new User()
        data.name = user.name, data.email = user.email, data.password = user.password
        return this.userRepository.save(data)
    }

    public async findOne(condition: { id?: string, email?: string }, requiredPassword: boolean = false) {
        let queryBuilder = this.userRepository.createQueryBuilder('user')
            .where("user.id = :id", { id: condition.id })
            .orWhere("user.email = :email", { email: condition.email })

        if (requiredPassword)
            queryBuilder.addSelect('user.password')
        return queryBuilder.getOne()
    }

    public async update(condition: { id: string }, user: UpdateUserDto) {
        return this.userRepository.update(condition, user)
    }

    public async save(user: User) {
        return this.userRepository.save(user)
    }

    public async destroy(id: string) {
        return this.userRepository.delete(id)
    }
}