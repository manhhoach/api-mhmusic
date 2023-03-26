import BaseService from './base'
import User from './../entities/user'
import AppError from './../helpers/appError';
import { CONSTANT_MESSAGES } from './../helpers/constant'
import AuthJwt from '../middlewares/jwt';
import UserRepository from '../repositories/user';
import UpdateUserDto from "./../dtos/user/user.update"
import CreateUserDto from "./../dtos/user/user.create"
import LoginUserDto from './../dtos/user/user.login'
import ChangePasswordDto from './../dtos/user/user.change.password'

export default class UserService extends BaseService<User>{
    constructor(private userRepository: UserRepository, private authJwt: AuthJwt) {
        super(userRepository)
    }

    async register(data: CreateUserDto) {
        return this.userRepository.create(data);
    }

    async login(data: LoginUserDto) {
        let user = await this.userRepository.findOne({ email: data.email }, true)
        if (user) {
            let isCompare = user.comparePassword(data.password);
            if (isCompare) {
                let token = this.authJwt.signToken(user.id)
                user = Object.assign(user, { password: undefined })
                return { ...user, token: token }
            }
            throw new AppError(401, CONSTANT_MESSAGES.INVALID_PASSWORD)
        }
        throw new AppError(404, CONSTANT_MESSAGES.USER_NOT_FOUND)
    }

    async changePassword(user: User, data: ChangePasswordDto) {
        let isCompare = user.comparePassword(data.oldPassword);
        if (isCompare) {
            user.password = data.newPassword;
            let userSaved = await this.userRepository.save(user);
            if(userSaved)
                return CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY
            return CONSTANT_MESSAGES.UPDATE_FAILED    
        }
        else
            throw new AppError(400, CONSTANT_MESSAGES.INVALID_PASSWORD)
    }

    async findByIdAndUpdate(id: string, obj: UpdateUserDto): Promise<User | null> {
        let data = await this.getById(id)
        if (!data) {
          return null
        }
        let entity = Object.assign(data, obj)
        return this.save(entity)
      }


}
