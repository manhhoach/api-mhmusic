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
exports.getTop = exports.destroy = exports.update = exports.create = exports.getOne = exports.getAllPaging = exports.getAll = void 0;
const config_1 = __importDefault(require("../db/config"));
let models = config_1.default.models;
function getAll(condition, pagination, singer = false, category = false, order = false) {
    return __awaiter(this, void 0, void 0, function* () {
        let includes = [];
        if (singer)
            includes.push({ model: config_1.default.models.singer });
        if (category)
            includes.push({ model: config_1.default.models.category });
        let orderCreatedDate = order ? [['createdDate', 'DESC']] : undefined;
        return models.song.findAll({
            where: condition,
            limit: pagination.limit,
            offset: pagination.offset,
            order: orderCreatedDate,
            include: includes
        });
    });
}
exports.getAll = getAll;
function getAllPaging(condition, pagination, singer = false, category = false, order = false) {
    return __awaiter(this, void 0, void 0, function* () {
        let includes = [];
        if (singer)
            includes.push({ model: config_1.default.models.singer });
        if (category)
            includes.push({ model: config_1.default.models.category });
        let orderCreatedDate = order ? [['createdDate', 'DESC']] : undefined;
        return models.song.findAndCountAll({
            where: condition,
            limit: pagination.limit,
            offset: pagination.offset,
            order: orderCreatedDate,
            include: includes
        });
    });
}
exports.getAllPaging = getAllPaging;
function getOne(condition, singer = false, category = false) {
    return __awaiter(this, void 0, void 0, function* () {
        let includes = [];
        if (singer)
            includes.push({ model: config_1.default.models.singer });
        if (category)
            includes.push({ model: config_1.default.models.category });
        return models.song.findOne({ where: condition, include: includes });
    });
}
exports.getOne = getOne;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return models.song.create(data);
    });
}
exports.create = create;
function update(data, condition) {
    return __awaiter(this, void 0, void 0, function* () {
        return models.song.update(data, { where: condition });
    });
}
exports.update = update;
function destroy(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        return models.song.destroy({ where: condition });
    });
}
exports.destroy = destroy;
function getTop(limit, singer = false, category = false) {
    return __awaiter(this, void 0, void 0, function* () {
        let includes = [];
        if (singer)
            includes.push({ model: config_1.default.models.singer });
        if (category)
            includes.push({ model: config_1.default.models.category });
        return models.song.findAll({
            limit: limit,
            order: [['view', 'DESC']],
            include: includes
        });
    });
}
exports.getTop = getTop;
