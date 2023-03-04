import UserRepository from '../repositories/user';
import User from './../entities/user'
import IUserCreate from '../interfaces/user/user.create'

export default class UserService {
    private userRepository = new UserRepository();

    public async register(name: string, email: string, password: string): Promise<User> {
        let user: IUserCreate = { name: name, email: email, password: password }
        console.log('user in service', user);
        return this.userRepository.register(user);
    }


}
