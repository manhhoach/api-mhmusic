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
const dbPort = parseInt(process.env.DB_PORT) || 3306;
const sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    port: dbPort,
    timezone: "+07:00",
    define: {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    },
    // dialectOptions: {
    //     ssl: {
    //         require: true
    //     }
    // }
});
sequelizeConnection.models.category = (0, category_1.createCategory)(sequelizeConnection);
sequelizeConnection.models.user = (0, user_1.createUser)(sequelizeConnection);
sequelizeConnection.models.singer = (0, singer_1.createSinger)(sequelizeConnection);
sequelizeConnection.models.song = (0, song_1.createSong)(sequelizeConnection);
sequelizeConnection.models.album = (0, album_1.createAlbum)(sequelizeConnection);
sequelizeConnection.models.album_song = (0, album_song_1.createAlbumSong)(sequelizeConnection);
sequelizeConnection.models.like = (0, like_1.createLike)(sequelizeConnection);
// sequelizeConnection.models.category.sync({ force: true })
// sequelizeConnection.models.singer.sync({ force: true })
// sequelizeConnection.models.song.sync({ force: true })
//sequelizeConnection.models.user.sync({force: true})
//sequelizeConnection.models.album.sync({force: true})
//sequelizeConnection.models.album_song.sync({force: true})
//sequelizeConnection.models.like.sync({ force: true })
//sequelizeConnection.sync({alter: true})
exports.default = sequelizeConnection;
