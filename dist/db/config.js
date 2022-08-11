"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_1 = require("../models/user");
const singer_1 = require("./../models/singer");
const category_1 = require("../models/category");
const song_1 = require("../models/song");
const album_1 = require("../models/album");
const album_song_1 = require("../models/album_song");
const like_1 = require("../models/like");
const dbName = process.env.DB_NAME || 'mhmusic';
const dbUser = process.env.DB_USER || 'root';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPassword = process.env.DB_PASSWORD || undefined;
const sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    port: 3306,
    timezone: "+07:00",
    define: {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    },
});
sequelizeConnection.models.category = (0, category_1.createCategory)(sequelizeConnection);
sequelizeConnection.models.user = (0, user_1.createUser)(sequelizeConnection);
sequelizeConnection.models.singer = (0, singer_1.createSinger)(sequelizeConnection);
sequelizeConnection.models.song = (0, song_1.createSong)(sequelizeConnection);
sequelizeConnection.models.album = (0, album_1.createAlbum)(sequelizeConnection);
sequelizeConnection.models.album_song = (0, album_song_1.createAlbumSong)(sequelizeConnection);
sequelizeConnection.models.like = (0, like_1.createLike)(sequelizeConnection);
//sequelizeConnection.models.category.sync({alter: true})
//sequelizeConnection.models.singer.sync({alter: true})
//sequelizeConnection.models.song.sync({alter: true})
//sequelizeConnection.models.user.sync({alter: true})
//sequelizeConnection.models.album.sync({force: true})
//sequelizeConnection.models.album_song.sync({force: true})
//sequelizeConnection.models.like.sync({ force: true })
//sequelizeConnection.sync({force: true})
// const deleteConstraint = () => {
//     const queryInterface = sequelizeConnection.getQueryInterface()
//     queryInterface.removeConstraint('likes', 'likes_songId_userId_unique')
//      queryInterface.removeIndex('likes', 'likes_albumId_userId_unique')
//     // queryInterface.removeConstraint('likes', 'likes_singerId_userId_unique')
// }
// //deleteConstraint()
exports.default = sequelizeConnection;
