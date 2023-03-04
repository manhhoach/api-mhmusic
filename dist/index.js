"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const postgres_1 = require("./api/databases/postgres");
postgres_1.AppDataSource.initialize().then(() => {
    const app = new app_1.default();
    app.listen();
}).catch(err => {
    console.error("Error during Data Source initialization", err);
});
