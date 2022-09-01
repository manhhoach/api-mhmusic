import sequelize from '../db/config';
import redis from './../db/connectRedis';
import schedule from 'node-schedule'

let models = sequelize.models;

const job = schedule.scheduleJob('* */10 * * *', async function () {
    let songs = await models.song.findAll();
    await Promise.all(songs.map(async (song: any) => {
        let view = await redis.get(`songId:${song.id}`);
        let viewRedis=parseInt(view as string);
        if ( viewRedis > song.view)
            return await models.song.update({ view: viewRedis }, { where: { id: song.id } })
        else
            return await redis.set(`songId:${song.id}`, song.view);
    }))
});

const mapping = async () => {
    let songs = await models.song.findAll();
    await Promise.all(songs.map(async (song: any) => {
        return await redis.set(`songId:${song.id}`, song.view);
    }))
}

export default job


