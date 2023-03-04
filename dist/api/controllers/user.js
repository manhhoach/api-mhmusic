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
const user_1 = __importDefault(require("./../services/user"));
const tryCatch_1 = __importDefault(require("../helpers/tryCatch"));
const response_1 = require("../helpers/response");
class UserController {
    constructor() {
        this.userService = new user_1.default();
        this.register = (0, tryCatch_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { email, password, name } = req.body;
            let user = yield this.userService.register(name, email, password);
            console.log('user in controller', user);
            res.status(201).json((0, response_1.responseSuccess)(user));
        }));
    }
    getMe(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = UserController;
