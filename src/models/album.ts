import { Sequelize, DataTypes, Optional, ModelDefined } from "sequelize";
import { createUser } from './user'

export interface IAlbum {
    id: number;
    name: string;
    year: number;
    userId: number;
    type: number;
    createdDate: Date;
}
type AlbumSongCreationAttributes = Optional<IAlbum, 'id'| 'createdDate'>

export function createAlbum(sequelize: Sequelize) {
    const User = createUser(sequelize)
    const Album: ModelDefined<IAlbum, AlbumSongCreationAttributes> = sequelize.define('album', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(1024),
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        type: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, { timestamps: false })

    User.hasMany(Album, { foreignKey: 'userId' });
    Album.belongsTo(User);

    return Album;
}

