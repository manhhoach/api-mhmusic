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

const mapping=async()=>{
    let songs = await models.song.findAll();
    await Promise.all(songs.map(async (song: any) => {
        return await redis.set(`songId:${song.id}`,song.view);
    }))
}

export default job


