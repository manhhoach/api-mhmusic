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
exports.destroy = exports.getByCondition = exports.create = exports.count = void 0;
const connectMysql_1 = __importDefault(require("../db/connectMysql"));
let models = connectMysql_1.default.models;
function count(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        return models.like.count({
            where: condition
        });
    });
}
exports.count = count;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return models.like.create(data);
    });
}
exports.create = create;
function getByCondition(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return models.like.findAll({ where: data });
    });
}
exports.getByCondition = getByCondition;
function destroy(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        return models.like.destroy({ where: condition });
    });
}
exports.destroy = destroy;
