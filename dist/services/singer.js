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
exports.destroy = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const connectMysql_1 = __importDefault(require("../db/connectMysql"));
let models = connectMysql_1.default.models;
function getAll(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        return models.singer.findAll({
            where: condition
        });
    });
}
exports.getAll = getAll;
function getOne(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        return models.singer.findOne({ where: condition });
    });
}
exports.getOne = getOne;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return models.singer.create(data);
    });
}
exports.create = create;
function update(data, condition) {
    return __awaiter(this, void 0, void 0, function* () {
        return models.singer.update(data, { where: condition });
    });
}
exports.update = update;
function destroy(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        return models.singer.destroy({ where: condition });
    });
}
exports.destroy = destroy;
