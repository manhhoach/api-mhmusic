"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSong = void 0;
const sequelize_1 = require("sequelize");
const category_1 = require("./category");
const singer_1 = require("./singer");
function createSong(sequelize) {
    const Category = (0, category_1.createCategory)(sequelize);
    const Singer = (0, singer_1.createSinger)(sequelize);
    const Song = sequelize.define('song', {
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
            type: new sequelize_1.DataTypes.STRING(2048),
            allowNull: false
        },
        url: {
            type: new sequelize_1.DataTypes.STRING(2048),
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
        performSinger: {
            type: new sequelize_1.DataTypes.STRING(256),
        },
        view: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },
        createdDate: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, { timestamps: false });
    Category.hasMany(Song);
    Song.belongsTo(Category);
    Singer.hasMany(Song);
    Song.belongsTo(Singer);
    return Song;
}
exports.createSong = createSong;
