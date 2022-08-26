import { Sequelize } from 'sequelize';
import sequelize, { InferAttributes, DataTypes, Model, InferCreationAttributes, CreationOptional } from "sequelize";
import { createUser } from '../models/user';
import { createSinger } from './../models/singer';
import { createCategory } from '../models/category';
import { createSong } from '../models/song';
import { createAlbum } from '../models/album';
import { createAlbumSong } from '../models/album_song';
import { createLike } from '../models/like';

const dbName = process.env.DB_NAME as string || 'mhmusic';
const dbUser = process.env.DB_USER as string || 'root'
const dbHost = process.env.DB_HOST as string || 'localhost'
const dbPassword = process.env.DB_PASSWORD as string || undefined
const dbPort= parseInt(process.env.DB_PORT as string) || 3306

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    port: dbPort,
    timezone: "+07:00",
    define: {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    },
});

sequelizeConnection.models.category = createCategory(sequelizeConnection);
sequelizeConnection.models.user = createUser(sequelizeConnection)
sequelizeConnection.models.singer = createSinger(sequelizeConnection)
sequelizeConnection.models.song = createSong(sequelizeConnection)
sequelizeConnection.models.album = createAlbum(sequelizeConnection)
sequelizeConnection.models.album_song = createAlbumSong(sequelizeConnection)
sequelizeConnection.models.like = createLike(sequelizeConnection)


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




export default sequelizeConnection


