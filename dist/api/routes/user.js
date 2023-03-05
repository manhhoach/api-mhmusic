"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./../controllers/user"));
const jwt_1 = __importDefault(require("./../middlewares/jwt"));
const validate_1 = __importDefault(require("./../helpers/validate"));
const user_create_1 = __importDefault(require("./../dtos/user/user.create"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authJwt = new jwt_1.default();
        this.userController = new user_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/login', this.userController.login);
        this.router.post('/register', (0, validate_1.default)(user_create_1.default), this.userController.register);
        this.router.get('/me', this.authJwt.verifyToken(false), this.userController.getMe);
        this.router.patch('/me', this.authJwt.verifyToken(false), this.userController.updateMe);
        this.router.patch('/change-password', this.authJwt.verifyToken(true), this.userController.changePassword);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = UserRoutes;
// const router = Router();
// router.post('/register', userController.register)
// router.post('/login', userController.login)
// router.use(checkJwt.checkToken)
// router.get('/', userController.getMe)
// router.patch('/', userController.updateMe)
// router.patch('/change-password', userController.changePassword)
