"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const response_1 = require("./api/helpers/response");
require("dotenv/config");
const routes_1 = __importDefault(require("./api/routes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = parseInt(process.env.PORT) || 3000;
        this.Router = new routes_1.default();
        this.useMiddlewares();
        this.useRoutes();
        this.useErrorHandler();
    }
    useMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    useErrorHandler() {
        this.app.use('*', (err, req, res, next) => {
            console.log(err);
            res.json((0, response_1.responseError)(err));
        });
    }
    useRoutes() {
        this.app.use('/api', this.Router.getRouter());
        this.app.get('/', (req, res) => {
            res.send('WELCOME TO API MHMUSIC');
        });
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`App listening on the port ${this.PORT}`);
        });
    }
}
exports.default = App;
