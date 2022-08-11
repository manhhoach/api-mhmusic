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
exports.create = exports.getOne = exports.getAll = void 0;
const trackService = __importStar(require("./../services/track"));
const response_1 = require("./../helper/response");
const pagination_1 = require("./../helper/pagination");
const tryCatch_1 = __importDefault(require("./../helper/tryCatch"));
const sequelize_1 = __importDefault(require("sequelize"));
const getUrlTrack_1 = __importDefault(require("./../helper/getUrlTrack"));
exports.getAll = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let condition = {};
    if (req.query.name) {
        condition.name = sequelize_1.default.where(sequelize_1.default.fn('LOWER', sequelize_1.default.col('track.name')), 'LIKE', '%' + req.query.name.toString().toLowerCase() + '%');
    }
    if (req.query.year) {
        condition.year = parseInt(req.query.year);
    }
    if (req.query.categoryId) {
        condition.categoryId = parseInt(req.query.categoryId);
    }
    let pagination = (0, pagination_1.getPagination)(parseInt(req.query.page_index), parseInt(req.query.page_size));
    let data = yield trackService.getAll(condition, pagination, true, true);
    let response = (0, pagination_1.getPagingData)(data, parseInt(req.query.page_index), pagination.limit);
    res.json((0, response_1.responseSuccess)(response));
}));
exports.getOne = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield trackService.getOne({ id: parseInt(req.params.id) }, true, true);
    res.json((0, response_1.responseSuccess)(data));
}));
exports.create = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let url = yield (0, getUrlTrack_1.default)(req.body.idSong);
    if (url.success === true) {
        let data = {
            name: req.body.name,
            image: req.body.image,
            url: url.url,
            year: req.body.year,
            categoryId: req.body.categoryId,
            singerId: req.body.singerId
        };
        let track = yield trackService.create(data);
        res.json((0, response_1.responseSuccess)(track));
    }
    else {
        res.json((0, response_1.responseError)("TRACK"));
    }
}));
