import { Optional, Sequelize, DataTypes, ModelDefined } from "sequelize";
import {createUser} from './user'

export interface ILike {
    id: number;
    createdDate: Date;
    varId: number;
    userId: number;
    type: number;
}
type LikeCreationAttributes=Optional<ILike, 'id'|'createdDate'>

export function createLike(sequelize: Sequelize) {
    const User=createUser(sequelize)
    const Like: ModelDefined<ILike, LikeCreationAttributes> = sequelize.define('like', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        userId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        varId:{
            type: DataTypes.INTEGER.UNSIGNED,
        },
        type: {
            type: DataTypes.ENUM('SONG', 'ALBUM', 'SINGER'),
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
        { timestamps: false }
    )
    User.hasMany(Like, {foreignKey: 'userId'});
    Like.belongsTo(User);

    return Like;
}

