import { Sequelize, DataTypes, Optional, ModelDefined } from "sequelize";
import { createCategory } from './category';
import { createSinger } from './singer'

export interface ISong {
    id: number;
    name: string;
    image: string;
    year: number;
    url: string;
    createdDate: Date;
    categoryId: number;
    singerId: number;
    performSinger: string;
    view: number;
}
type SongCreationAttributes=Optional<ISong, 'id'|'view'|'createdDate'>

export function createSong(sequelize: Sequelize) {
    const Category = createCategory(sequelize)
    const Singer = createSinger(sequelize)
    const Song: ModelDefined<ISong, SongCreationAttributes> = sequelize.define('song', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        image: {
            type: new DataTypes.STRING(2048),
            allowNull: false
        },
        url: {
            type: new DataTypes.STRING(2048),
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Category,
                key: 'id'
            }
        },
        singerId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Singer,
                key: 'id'
            }
        },
        performSinger:{
            type: new DataTypes.STRING(256),
        },
        view:{
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
        { timestamps: false }
    )
    Category.hasMany(Song)
    Song.belongsTo(Category)

    Singer.hasMany(Song)
    Song.belongsTo(Singer)
    
    return Song;

}

