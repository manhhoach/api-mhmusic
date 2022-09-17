"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLike = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
function createLike(sequelize) {
    const User = (0, user_1.createUser)(sequelize);
    const Like = sequelize.define('like', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
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
    User.hasMany(Like, { foreignKey: 'userId' });
    Like.belongsTo(User);
    return Like;
}
exports.createLike = createLike;
