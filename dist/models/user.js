"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function createUser(sequelize) {
    const User = sequelize.define('user', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        fullName: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: new sequelize_1.DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        password: {
            type: new sequelize_1.DataTypes.STRING(255),
            allowNull: false
        },
        avatar: {
            type: new sequelize_1.DataTypes.STRING(1024),
            defaultValue: '/user.png'
        },
        type: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },
        createdDate: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, { timestamps: false });
    User.afterValidate((user) => {
        if (user.password) {
            let salt = bcryptjs_1.default.genSaltSync(10);
            user.password = bcryptjs_1.default.hashSync(user.password, salt);
        }
    });
    return User;
}
exports.createUser = createUser;
