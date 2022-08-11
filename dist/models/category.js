"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const sequelize_1 = require("sequelize");
function createCategory(sequelize) {
    const Category = sequelize.define('category', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        parentId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },
        createdDate: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, { timestamps: false });
    return Category;
}
exports.createCategory = createCategory;
