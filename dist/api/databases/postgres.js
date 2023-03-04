"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const ormConfig_1 = require("../../config/ormConfig");
exports.AppDataSource = new typeorm_1.DataSource(ormConfig_1.ORM_CONFIG);
