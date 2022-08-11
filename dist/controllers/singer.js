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
exports.destroy = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const singerService = __importStar(require("./../services/singer"));
const response_1 = require("./../helper/response");
const tryCatch_1 = __importDefault(require("./../helper/tryCatch"));
const sequelize_1 = __importDefault(require("sequelize"));
exports.getAll = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let condition = {};
    if (req.query.name) {
        condition.fullName = sequelize_1.default.where(sequelize_1.default.fn('LOWER', sequelize_1.default.col('singer.fullName')), 'LIKE', '%' + req.query.name.toString().toLowerCase() + '%');
    }
    let singers = yield singerService.getAll(condition);
    res.json((0, response_1.responseSuccess)(singers));
}));
exports.getOne = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let singers = yield singerService.getOne({ id: req.params.id });
    res.json((0, response_1.responseSuccess)(singers));
}));
exports.create = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let singer = req.body;
    let data = yield singerService.create(singer);
    res.json((0, response_1.responseSuccess)(data));
}));
exports.update = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let singer = req.body;
    let result = yield singerService.update(singer, { id: req.params.id });
    if (result[0] === 1) {
        let data = yield singerService.getOne({ id: req.params.id });
        res.json((0, response_1.responseSuccess)(data));
    }
    else {
        res.json((0, response_1.responseError)("UPDATE FAILED"));
    }
}));
exports.destroy = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Promise.all(req.body.ids.map((id) => __awaiter(void 0, void 0, void 0, function* () { return yield singerService.destroy({ id: id }); })));
    if (result.includes(1)) {
        res.json((0, response_1.responseSuccess)("DELETE SUCCESS"));
    }
    else {
        res.json((0, response_1.responseError)("DELETE FAILED"));
    }
}));
