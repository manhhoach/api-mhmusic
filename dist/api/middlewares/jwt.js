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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../repositories/user"));
const appError_1 = __importDefault(require("./../helpers/appError"));
const constant_1 = require("./../helpers/constant");
class AuthJwt {
    constructor() {
        this.userRepository = new user_1.default();
        this.signToken = (id) => {
            return jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY, { expiresIn: '7d' });
        };
        this.verifyToken = (getPassword = false) => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                    if (token) {
                        let decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
                        let user = yield this.userRepository.findOne({ id: decoded.id }, getPassword);
                        if (user) {
                            res.locals.user = user;
                            return next();
                        }
                        return next(new appError_1.default(404, constant_1.CONSTANT_MESSAGES.USER_NOT_FOUND));
                    }
                    next(new appError_1.default(400, constant_1.CONSTANT_MESSAGES.TOKEN_NOT_PROVIDED));
                }
                catch (error) {
                    next(new appError_1.default(400, constant_1.CONSTANT_MESSAGES.INVALID_TOKEN));
                }
            });
        };
    }
}
exports.default = AuthJwt;
