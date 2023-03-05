import UserRepository from '../repositories/user';
import User from './../entities/user'
import AppError from './../helpers/appError';
import { CONSTANT_MESSAGES } from './../helpers/constant'
import AuthJwt from '../middlewares/jwt';

export default class UserService {
    private userRepository = new UserRepository();
    private authJwt = new AuthJwt();

    public async register(name: string, email: string, password: string) {
        let user = { name: name, email: email, password: password }
        return this.userRepository.create(user);
    }

    public async login(email: string, password: string) {
        let user = await this.userRepository.findOne({ email: email }, true)
        if (user) {
            let isCompare = user.comparePassword(password);
            if (isCompare) {
                let token = this.authJwt.signToken(user.id)
                user = Object.assign(user, { password: undefined })
                return { ...user, token: token }
            }
            throw new AppError(401, CONSTANT_MESSAGES.INVALID_PASSWORD)
        }
        throw new AppError(404, CONSTANT_MESSAGES.USER_NOT_FOUND)
    }

    public async update(id: string, name: string) {
        let user = await this.userRepository.update({ id: id }, { name: name })
        if (user.affected === 1) {
            let data = await this.userRepository.findOne({ id: id })
            return data;
        }
        else
            throw new AppError(400, CONSTANT_MESSAGES.UPDATE_FAILED)
    }

    public async changePassword(user: User,oldPassword: string, newPassword: string) {
        let isCompare = user.comparePassword(oldPassword);
        if (isCompare) {
            user.password = newPassword;
            let data = await this.userRepository.save(user);
            if(data)
                return CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY
            return CONSTANT_MESSAGES.UPDATE_FAILED    
        }
        else
            throw new AppError(400, CONSTANT_MESSAGES.INVALID_PASSWORD)
    }

    public async destroy(id: string) {
        let result = await this.userRepository.destroy(id)
        if (result.affected === 1) {
            return null
        }
        else
            throw new AppError(400, CONSTANT_MESSAGES.DELETE_FAILED)
    }

}
