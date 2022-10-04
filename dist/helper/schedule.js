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
exports.countViewEveryHourSchedule = exports.mapViewSchedule = void 0;
const config_1 = __importDefault(require("../db/config"));
const connectRedis_1 = __importDefault(require("./../db/connectRedis"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const convertTimeZone_1 = __importDefault(require("./convertTimeZone"));
let models = config_1.default.models;
const mapping = () => __awaiter(void 0, void 0, void 0, function* () {
    let songs = yield models.song.findAll();
    yield Promise.all(songs.map((song) => __awaiter(void 0, void 0, void 0, function* () {
        return yield connectRedis_1.default.set(`songId:${song.id}`, song.view);
    })));
});
const mapViewSchedule = node_schedule_1.default.scheduleJob('* */15 * * * *', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let songs = yield models.song.findAll();
        yield Promise.all(songs.map((song) => __awaiter(this, void 0, void 0, function* () {
            let view = yield connectRedis_1.default.get(`songId:${song.id}`);
            let viewRedis = parseInt(view);
            if (viewRedis > song.view)
                return yield models.song.update({ view: viewRedis }, { where: { id: song.id } });
            else
                return yield connectRedis_1.default.set(`songId:${song.id}`, song.view);
        })));
    });
});
exports.mapViewSchedule = mapViewSchedule;
const countViewEveryHourSchedule = node_schedule_1.default.scheduleJob('0 0 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    let timeStandard = (0, convertTimeZone_1.default)(new Date());
    let songs = yield models.song.findAll();
    yield Promise.all(songs.map((song) => __awaiter(void 0, void 0, void 0, function* () {
        let view = yield connectRedis_1.default.get(`songId:${song.id}`);
        return yield connectRedis_1.default.set(`SONGID:${song.id}-TIME:${timeStandard}`, parseInt(view), 'EX', 2 * 24 * 60 * 60);
    })));
}));
exports.countViewEveryHourSchedule = countViewEveryHourSchedule;
