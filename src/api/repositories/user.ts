import User from './../entities/user'
import { AppDataSource } from './../databases/postgres'
import IUserCreate from '../interfaces/user/user.create'


export default class UserRepository {
    private userRepository = AppDataSource.getRepository(User)
    async register(user: IUserCreate): Promise<User> {
        let data = new User()
        data.name = user.name, data.email = user.email, data.password = user.password
        return this.userRepository.save(data)
    }
}