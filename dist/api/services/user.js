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
const user_1 = __importDefault(require("../repositories/user"));
const appError_1 = __importDefault(require("./../helpers/appError"));
const constant_1 = require("./../helpers/constant");
const jwt_1 = __importDefault(require("../middlewares/jwt"));
class UserService {
    constructor() {
        this.userRepository = new user_1.default();
        this.authJwt = new jwt_1.default();
    }
    register(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = { name: name, email: email, password: password };
            return this.userRepository.register(user);
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepository.findOne({ email: email }, true);
            if (user) {
                let isCompare = user.comparePassword(password);
                if (isCompare) {
                    let token = this.authJwt.signToken(user.id);
                    user = Object.assign(user, { password: undefined });
                    return Object.assign(Object.assign({}, user), { token: token });
                }
                throw new appError_1.default(401, constant_1.CONSTANT_MESSAGES.INVALID_PASSWORD);
            }
            throw new appError_1.default(404, constant_1.CONSTANT_MESSAGES.USER_NOT_FOUND);
        });
    }
    update(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepository.update({ id: id }, { name: name });
            if (user.affected === 1) {
                let data = yield this.userRepository.findOne({ id: id });
                return data;
            }
            else
                throw new appError_1.default(400, constant_1.CONSTANT_MESSAGES.UPDATE_FAILED);
        });
    }
    changePassword(user, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            let isCompare = user.comparePassword(oldPassword);
            if (isCompare) {
                user.password = newPassword;
                let data = yield this.userRepository.save(user);
                if (data)
                    return constant_1.CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY;
                return constant_1.CONSTANT_MESSAGES.UPDATE_FAILED;
            }
            else
                throw new appError_1.default(400, constant_1.CONSTANT_MESSAGES.INVALID_PASSWORD);
        });
    }
}
exports.default = UserService;
