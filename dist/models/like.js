"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLike = void 0;
const sequelize_1 = require("sequelize");
function createLike(sequelize) {
    const Like = sequelize.define('like', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        varId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        type: {
            type: sequelize_1.DataTypes.ENUM('SONG', 'ALBUM', 'SINGER'),
        },
        createdDate: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, { timestamps: false });
    return Like;
}
exports.createLike = createLike;
