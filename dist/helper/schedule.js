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
exports.countViewEveryHourSchedule = exports.updateViewSchedule = exports.setUpView = void 0;
const connectMysql_1 = __importDefault(require("../db/connectMysql"));
const connectRedis_1 = __importDefault(require("./../db/connectRedis"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const convertTimeZone_1 = __importDefault(require("./convertTimeZone"));
let models = connectMysql_1.default.models;
const constant_1 = __importDefault(require("./constant"));
const setUpView = () => __awaiter(void 0, void 0, void 0, function* () {
    let songs = yield models.song.findAll();
    yield Promise.all(songs.map((song) => __awaiter(void 0, void 0, void 0, function* () {
        return yield connectRedis_1.default.set(`${constant_1.default.SONG_ID}:${song.id}`, 0);
    })));
    console.log('Set up view on redis successfully');
});
exports.setUpView = setUpView;
const updateViewSchedule = node_schedule_1.default.scheduleJob('* */15 * * * *', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let songs = yield models.song.findAll();
        yield Promise.all(songs.map((song) => __awaiter(this, void 0, void 0, function* () {
            let view = yield connectRedis_1.default.get(`${constant_1.default.SONG_ID}:${song.id}`);
            let viewRedis = parseInt(view) || 0;
            if (viewRedis !== 0)
                yield models.song.increment({ view: viewRedis }, { where: { id: song.id } });
            yield connectRedis_1.default.set(`${constant_1.default.SONG_ID}:${song.id}`, 0);
        })));
    });
});
exports.updateViewSchedule = updateViewSchedule;
const countViewEveryHourSchedule = node_schedule_1.default.scheduleJob('0 0 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    let timeStandard = (0, convertTimeZone_1.default)(new Date());
    let songs = yield models.song.findAll();
    yield Promise.all(songs.map((song) => __awaiter(void 0, void 0, void 0, function* () {
        let view = yield connectRedis_1.default.get(`${constant_1.default.SONG_ID}:${song.id}`);
        return yield connectRedis_1.default.set(`${constant_1.default.SONG_ID}:${song.id}-${constant_1.default.TIME}:${timeStandard}`, parseInt(view), 'EX', 2 * 24 * 60 * 60);
    })));
}));
exports.countViewEveryHourSchedule = countViewEveryHourSchedule;
