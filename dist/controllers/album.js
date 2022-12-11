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
exports.removeSong = exports.addSong = exports.getOne = exports.destroy = exports.update = exports.create = exports.getAll = void 0;
const albumService = __importStar(require("./../services/album"));
const response_1 = require("./../helper/response");
const pagination_1 = require("./../helper/pagination");
const tryCatch_1 = __importDefault(require("./../helper/tryCatch"));
const sequelize_1 = __importDefault(require("sequelize"));
const albumSongService = __importStar(require("./../services/album_song"));
const TYPE_ALBUM_ADMIN = 10;
exports.getAll = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let type = TYPE_ALBUM_ADMIN;
    let condition = {};
    if (req.query.type == '0' && res.locals.user) {
        type = parseInt(req.query.type);
        condition.userId = res.locals.user.id;
    }
    condition.type = type;
    if (req.query.name) {
        condition.name = sequelize_1.default.where(sequelize_1.default.fn('LOWER', sequelize_1.default.col('album.name')), 'LIKE', '%' + req.query.name.toString().toLowerCase() + '%');
    }
    if (req.query.year) {
        condition.year = parseInt(req.query.year);
    }
    let pagination = (0, pagination_1.getPagination)(parseInt(req.query.page_index), parseInt(req.query.page_size));
    let albums = yield albumService.getAllPaging(condition, pagination);
    let data = (0, pagination_1.getPagingData)(albums, parseInt(req.query.page_index), pagination.limit);
    res.json((0, response_1.responseSuccess)(data));
}));
exports.create = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let album = Object.assign(Object.assign({}, req.body), { type: res.locals.user.type, userId: res.locals.user.id });
    let data = yield albumService.create(album);
    res.json((0, response_1.responseSuccess)(data));
}));
exports.update = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let album = {
        name: req.body.name,
        year: req.body.year
    };
    let result = yield albumService.update(album, { id: req.params.id, userId: res.locals.user.id });
    if (result[0] === 1) {
        let data = yield albumService.getOne({ id: req.params.id });
        res.json((0, response_1.responseSuccess)(data));
    }
    else {
        res.json((0, response_1.responseError)("UPDATE FAILED"));
    }
}));
exports.destroy = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Promise.all(req.body.ids.map((id) => __awaiter(void 0, void 0, void 0, function* () { return yield albumService.destroy({ id: id, userId: res.locals.user.id }); })));
    if (result.includes(1)) {
        res.json((0, response_1.responseSuccess)("DELETE SUCCESS"));
    }
    else {
        res.json((0, response_1.responseError)("DELETE FAILED"));
    }
}));
exports.getOne = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    if (res.locals.user && req.query.type == "0") {
        data = yield albumSongService.getOne({
            album_song: { albumId: parseInt(req.params.albumId) },
            album: { userId: res.locals.user.id }
        });
    }
    else {
        data = yield albumSongService.getOne({
            album_song: { albumId: parseInt(req.params.albumId) },
            album: { type: 10 }
        });
    }
    if (data.length > 0) {
        let album = data[0].album.dataValues;
        let songs = data.map((ele) => ele.song.dataValues);
        res.json((0, response_1.responseSuccess)(Object.assign(Object.assign({}, album), { songs })));
    }
    else {
        res.json((0, response_1.responseSuccess)([]));
    }
}));
exports.addSong = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let check = yield checkAlbum(req.body.albumId, res.locals.user.id);
    if (check) {
        let abs = Object.assign({}, req.body);
        let data = yield albumSongService.create(abs);
        res.json((0, response_1.responseSuccess)(data));
    }
    else {
        res.json((0, response_1.responseError)("USER OR ALBUM IS NOT EXIST"));
    }
}));
exports.removeSong = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let check = yield checkAlbum(req.body.albumId, res.locals.user.id);
    if (check) {
        let condition = Object.assign({}, req.body);
        let data = yield albumSongService.destroy(condition);
        if (data === 1) {
            res.json((0, response_1.responseSuccess)("REMOVE SUCCESS"));
        }
        else {
            res.json((0, response_1.responseError)("REMOVE FAILED"));
        }
    }
    else {
        res.json((0, response_1.responseError)("USER OR ALBUM IS NOT EXIST"));
    }
}));
const checkAlbum = (albumId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return albumService.getOne({ id: albumId, userId: userId });
});
