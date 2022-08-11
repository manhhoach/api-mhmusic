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
exports.getRecentSongs = exports.destroy = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const songService = __importStar(require("../services/song"));
const response_1 = require("../helper/response");
const pagination_1 = require("../helper/pagination");
const tryCatch_1 = __importDefault(require("../helper/tryCatch"));
const sequelize_1 = __importDefault(require("sequelize"));
const getUrlTracks_1 = __importDefault(require("../helper/getUrlTracks"));
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
    let pagination = (0, pagination_1.getPagination)(parseInt(req.query.page_index), parseInt(req.query.page_size));
    let data = yield songService.getAll(condition, pagination, true, true);
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
            data = Object.assign(Object.assign({}, req.body), { url: `http://api.mp3.zing.vn/api/streaming/audio/${req.body.songId}/320` });
        }
        else {
            return res.json((0, response_1.responseError)("Song id or Song does not exist"));
        }
    }
    else {
        data = Object.assign({}, req.body);
    }
    let song = yield songService.create(data);
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
    let recentSongsId = res.locals.user.recentSongs.split(';');
    let recentSongs = yield Promise.all(recentSongsId.map((id) => __awaiter(void 0, void 0, void 0, function* () {
        let song = yield songService.getOne({ id: parseInt(id) }, false, false);
        return song === null || song === void 0 ? void 0 : song.dataValues;
    })));
    res.json((0, response_1.responseSuccess)(recentSongs));
}));
