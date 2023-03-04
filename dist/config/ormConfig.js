"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORM_CONFIG = void 0;
require("dotenv/config");
const user_1 = __importDefault(require("./../api/entities/user"));
exports.ORM_CONFIG = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    //synchronize: true,
    logging: true,
    entities: [user_1.default],
    subscribers: [],
    migrations: [],
};
