"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlbumSong = void 0;
const sequelize_1 = require("sequelize");
const song_1 = require("./song");
const album_1 = require("./album");
function createAlbumSong(sequelize) {
    const Song = (0, song_1.createSong)(sequelize);
    const Album = (0, album_1.createAlbum)(sequelize);
    const AlbumSong = sequelize.define('album_song', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        songId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Song,
                key: 'id'
            }
        },
        albumId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Album,
                key: 'id'
            }
        },
        createdDate: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, { timestamps: false });
    Song.belongsToMany(Album, { through: AlbumSong });
    Album.belongsToMany(Song, { through: AlbumSong });
    AlbumSong.belongsTo(Song);
    AlbumSong.belongsTo(Album);
    Song.hasMany(AlbumSong);
    Album.hasMany(AlbumSong);
    return AlbumSong;
}
exports.createAlbumSong = createAlbumSong;
