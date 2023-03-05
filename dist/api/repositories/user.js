"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./../entities/user"));
const postgres_1 = require("./../databases/postgres");
class UserRepository {
    constructor() {
        this.userRepository = postgres_1.AppDataSource.getRepository(user_1.default);
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = new user_1.default();
            data.name = user.name, data.email = user.email, data.password = user.password;
            return this.userRepository.save(data);
        });
    }
    findOne(condition, requiredPassword = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryBuilder = this.userRepository.createQueryBuilder('user')
                .where("user.id = :id", { id: condition.id })
                .orWhere("user.email = :email", { email: condition.email });
            if (requiredPassword)
                queryBuilder.addSelect('user.password');
            return queryBuilder.getOne();
        });
    }
    update(condition, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.update(condition, user);
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.save(user);
        });
    }
}
exports.default = UserRepository;
