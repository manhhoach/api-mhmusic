"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
let connectionString = process.env.REDIS_URL || '127.0.0.1:6379';
const redis = new ioredis_1.default(connectionString);
exports.default = redis;
