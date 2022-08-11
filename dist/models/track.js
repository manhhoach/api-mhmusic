"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrack = void 0;
const sequelize_1 = require("sequelize");
const category_1 = require("./category");
const singer_1 = require("./singer");
function createTrack(sequelize) {
    const Category = (0, category_1.createCategory)(sequelize);
    const Singer = (0, singer_1.createSinger)(sequelize);
    const Track = sequelize.define('track', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false
        },
        image: {
            type: new sequelize_1.DataTypes.STRING(1024),
            allowNull: false
        },
        url: {
            type: new sequelize_1.DataTypes.STRING(1024),
            allowNull: false
        },
        year: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        categoryId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Category,
                key: 'id'
            }
        },
        singerId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Singer,
                key: 'id'
            }
        },
        createdDate: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, { timestamps: false });
    Category.hasMany(Track);
    Track.belongsTo(Category);
    Singer.hasMany(Track);
    Track.belongsTo(Singer);
    return Track;
}
exports.createTrack = createTrack;
