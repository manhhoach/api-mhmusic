import { InferAttributes, Sequelize, DataTypes, Model, InferCreationAttributes, CreationOptional } from "sequelize";
import {createUser} from './user'

export interface ILike extends Model<InferAttributes<ILike>, InferCreationAttributes<ILike>> {
    id: CreationOptional<number>;
    createdDate: CreationOptional<Date>;
    varId: number;
    userId: number;
    type: number;
}


export function createLike(sequelize: Sequelize) {
    const User=createUser(sequelize)
    const Like = sequelize.define<ILike>('like', {
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

