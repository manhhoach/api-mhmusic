"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./../controllers/user"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new user_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/me', this.userController.getMe);
        this.router.post('/register', this.userController.register);
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
