"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSinger = void 0;
const sequelize_1 = require("sequelize");
function createSinger(sequelize) {
    const Singer = sequelize.define('singer', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        fullName: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.STRING(1024)
        },
        avatar: {
            type: new sequelize_1.DataTypes.STRING(1024),
            defaultValue: 'xxx.jpg'
        },
        createdDate: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, { timestamps: false });
    return Singer;
}
exports.createSinger = createSinger;
