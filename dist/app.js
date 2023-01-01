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
const express_1 = __importDefault(require("express"));
require("dotenv/config"); // kỹ thuật mới
const connectMysql_1 = __importDefault(require("./db/connectMysql"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const schedule_1 = require("./helper/schedule");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('image'));
app.use((0, cors_1.default)());
app.use(index_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to MH-Music!');
});
(0, schedule_1.setUpView)();
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running on http://localhost:${port}`);
    try {
        yield connectMysql_1.default.authenticate();
        schedule_1.updateViewSchedule;
        schedule_1.countViewEveryHourSchedule;
        console.log('Connection has been established successfully.');
    }
    catch (err) {
        console.log('Unable to connect to the database:', err);
    }
}));
