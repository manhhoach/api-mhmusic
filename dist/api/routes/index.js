"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
class IndexRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userRoutes = new user_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use('/users', this.userRoutes.getRouter());
    }
    getRouter() {
        return this.router;
    }
}
exports.default = IndexRouter;
