import { InferAttributes, Sequelize, DataTypes, Model, InferCreationAttributes, CreationOptional } from "sequelize";
import { createSong } from './song';
import { createAlbum } from './album'

export interface IAlbumSong extends Model<InferAttributes<IAlbumSong>, InferCreationAttributes<IAlbumSong>> {
    id: CreationOptional<number>;
    createdDate: CreationOptional<Date>;
    songId: number;
    albumId: number;
}


export function createAlbumSong(sequelize: Sequelize) {
    const Song = createSong(sequelize)
    const Album = createAlbum(sequelize)
    const AlbumSong = sequelize.define<IAlbumSong>('album_song', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        songId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Song,
                key: 'id'
            }
        },
        albumId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Album,
                key: 'id'
            }
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
        { timestamps: false }
    )
    Song.belongsToMany(Album, {through:AlbumSong} )
    Album.belongsToMany(Song, {through:AlbumSong} )

   
    AlbumSong.belongsTo(Song)
    AlbumSong.belongsTo(Album)

    Song.hasMany(AlbumSong)
    Album.hasMany(AlbumSong)
    
    return AlbumSong;

}

