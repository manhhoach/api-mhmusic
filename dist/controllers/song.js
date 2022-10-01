"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateRecentSongs = exports.getTop10Song = exports.getChart = exports.updateView = exports.getRecentSongs = exports.destroy = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const songService = __importStar(require("../services/song"));
const response_1 = require("../helper/response");
const pagination_1 = require("../helper/pagination");
const tryCatch_1 = __importDefault(require("../helper/tryCatch"));
const sequelize_1 = __importDefault(require("sequelize"));
const getUrlTracks_1 = __importDefault(require("../helper/getUrlTracks"));
const connectRedis_1 = __importDefault(require("./../db/connectRedis"));
const macaddress_1 = __importDefault(require("macaddress"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
exports.getAll = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let condition = {};
    if (req.query.name) {
        condition.name = sequelize_1.default.where(sequelize_1.default.fn('LOWER', sequelize_1.default.col('song.name')), 'LIKE', '%' + req.query.name.toString().toLowerCase() + '%');
    }
    if (req.query.year) {
        condition.year = parseInt(req.query.year);
    }
    if (req.query.categoryId) {
        condition.categoryId = parseInt(req.query.categoryId);
    }
    let order = req.query.latest ? true : false;
    let pagination = (0, pagination_1.getPagination)(parseInt(req.query.page_index), parseInt(req.query.page_size));
    let data = yield songService.getAll(condition, pagination, true, true, order);
    let response = (0, pagination_1.getPagingData)(data, parseInt(req.query.page_index), pagination.limit);
    res.json((0, response_1.responseSuccess)(response));
}));
exports.getOne = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield songService.getOne({ id: parseInt(req.params.id) }, true, true);
    res.json((0, response_1.responseSuccess)(data));
}));
exports.create = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    if (req.body.songId && !req.body.url) {
        let url = yield (0, getUrlTracks_1.default)(req.body.songId);
        if (url.success === true) {
            data = Object.assign(Object.assign({}, req.body), { url: `http://api.mp3.zing.vn/api/streaming/audio/${req.body.songId}/128` });
        }
        else {
            return res.json((0, response_1.responseError)("Song id or Song does not exist"));
        }
    }
    else {
        data = Object.assign({}, req.body);
    }
    let song = yield songService.create(data);
    yield connectRedis_1.default.set(`songId:${song.id}`, song.view);
    res.json((0, response_1.responseSuccess)(song));
}));
exports.update = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    if (req.body.songId && !req.body.url) {
        let url = yield (0, getUrlTracks_1.default)(req.body.songId);
        if (url.success === true) {
            data = Object.assign(Object.assign({}, req.body), { url: `http://api.mp3.zing.vn/api/streaming/audio/${req.body.songId}/320` });
        }
        else {
            return res.json((0, response_1.responseError)("Song id or Song does not exist"));
        }
    }
    else {
        data = Object.assign({}, req.body);
    }
    let result = yield songService.update(data, { id: parseInt(req.params.id) });
    if (result[0] === 1) {
        let song = yield songService.getOne({ id: parseInt(req.params.id) });
        res.json((0, response_1.responseSuccess)(song));
    }
    else {
        res.json((0, response_1.responseError)("UPDATE FAILED"));
    }
}));
exports.destroy = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Promise.all(req.body.ids.map((id) => __awaiter(void 0, void 0, void 0, function* () { return yield songService.destroy({ id: id }); })));
    if (result.includes(1)) {
        res.json((0, response_1.responseSuccess)("DELETE SUCCESS"));
    }
    else {
        res.json((0, response_1.responseError)("DELETE FAILED"));
    }
}));
exports.getRecentSongs = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const TEMPLATE_RECENTSONGS = `recentSongsUser:${res.locals.user.id}`;
    let recentSongsId = yield connectRedis_1.default.lrange(TEMPLATE_RECENTSONGS, 0, -1);
    let recentSongs = yield Promise.all(recentSongsId.map((id) => __awaiter(void 0, void 0, void 0, function* () {
        let song = yield songService.getOne({ id: parseInt(id) }, false, false);
        return song === null || song === void 0 ? void 0 : song.dataValues;
    })));
    res.json((0, response_1.responseSuccess)(recentSongs));
}));
exports.updateView = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = `songId:${req.params.id}`;
    const macAddress = `macAddress:${yield macaddress_1.default.one()}`;
    const isOK = yield connectRedis_1.default.set(`${macAddress}-${songId}`, 'MH-MUSIC', 'EX', 60 * 3, 'NX');
    if (isOK === 'OK') {
        let data = yield connectRedis_1.default.incrby(songId, 1);
        res.json((0, response_1.responseSuccess)(data));
    }
    else {
        res.json((0, response_1.responseError)('INCRE VIEW FAILED'));
    }
}));
exports.getChart = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let songs = yield songService.getTop(3);
    let arr_time = [];
    for (let i = 0; i < 12; i++) {
        arr_time.push((0, moment_timezone_1.default)().tz('Asia/Ho_Chi_Minh').subtract(2 * i, 'hours').format('HH:00:00, D/M/Y'));
    }
    let data = yield Promise.all(arr_time.map((time) => __awaiter(void 0, void 0, void 0, function* () {
        let viewByHours = yield Promise.all(songs.map((song) => __awaiter(void 0, void 0, void 0, function* () {
            let view = yield connectRedis_1.default.get(`SONGID:${song.id}-TIME:${time}`);
            return {
                id: song.id,
                name: song.name,
                view: view ? view : 0
            };
        })));
        return {
            time: time, viewByHours: viewByHours
        };
    })));
    res.json((0, response_1.responseSuccess)(data));
}));
exports.getTop10Song = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let songs = yield songService.getTop(10);
    res.json((0, response_1.responseSuccess)(songs));
}));
exports.updateRecentSongs = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const TEMPLATE_RECENTSONGS = `recentSongsUser:${res.locals.user.id}`;
    const LENGTH_RECENTSONGS = 10;
    let recentSongs = yield connectRedis_1.default.lrange(TEMPLATE_RECENTSONGS, 0, -1);
    if (recentSongs.length >= LENGTH_RECENTSONGS) {
        yield connectRedis_1.default.lpop(TEMPLATE_RECENTSONGS);
    }
    if (!recentSongs.includes(req.body.songId.toString())) {
        yield connectRedis_1.default.rpush(TEMPLATE_RECENTSONGS, req.body.songId);
        recentSongs = yield connectRedis_1.default.lrange(TEMPLATE_RECENTSONGS, 0, -1);
        res.json((0, response_1.responseSuccess)(recentSongs));
    }
    else {
        res.json((0, response_1.responseError)('UPDATE FAILED'));
    }
}));
