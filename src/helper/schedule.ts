import sequelize from '../db/config';
import redis from './../db/connectRedis';
import schedule from 'node-schedule'

let models = sequelize.models;

const job = schedule.scheduleJob('* */15 * * *', async function () {
    let songs = await models.song.findAll();
    await Promise.all(songs.map(async (song: any) => {
        let view = await redis.get(`songId:${song.id}`);
        if (view != song.view)
            return await models.song.update({ view: parseInt(view as string) }, { where: { id: song.id } })
    }))
});

export default job


// map views from redis to mysql
// const mappingView = async () => {
//     let songs = await models.song.findAll();
//     let data = await Promise.all(songs.map(async (song: any) => {
//         let view = await redis.get(`songId:${song.id}`);
//         if (view != song.view)
//             return await models.song.update({ view: parseInt(view as string) }, { where: { id: song.id } })
//     }))
//     return data;
// }