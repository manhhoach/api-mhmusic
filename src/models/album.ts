import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import {createUser} from './user'

export interface IAlbum extends Model<InferAttributes<IAlbum>, InferCreationAttributes<IAlbum>>{
    id: CreationOptional<number>;
    name: string;
    year: number;
    userId: number;
    type: number;
    createdDate: CreationOptional<Date>;
}
export function createAlbum (sequelize: Sequelize) {
    const User=createUser(sequelize)
    const Album = sequelize.define<IAlbum>('album', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        }, 
        name: {
            type: new DataTypes.STRING(1024),
            allowNull: false        
        },
        year:{
            type: DataTypes.INTEGER.UNSIGNED,
        },
        userId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        type:{
            type: DataTypes.INTEGER.UNSIGNED,
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, { timestamps: false })

    User.hasMany(Album, {foreignKey: 'userId'});
    Album.belongsTo(User);

    return Album;
}

