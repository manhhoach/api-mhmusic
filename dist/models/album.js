"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlbum = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
function createAlbum(sequelize) {
    const User = (0, user_1.createUser)(sequelize);
    const Album = sequelize.define('album', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new sequelize_1.DataTypes.STRING(1024),
            allowNull: false
        },
        year: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        type: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        createdDate: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, { timestamps: false });
    User.hasMany(Album, { foreignKey: 'userId' });
    Album.belongsTo(User);
    return Album;
}
exports.createAlbum = createAlbum;
