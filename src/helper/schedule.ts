import sequelize from '../db/connectMysql';
import redis from './../db/connectRedis';
import schedule from 'node-schedule'
import convertTZ from './convertTimeZone'
let models = sequelize.models;
import CONSTANT from './constant';


const setUpView = async () => {
    let songs = await models.song.findAll();
    await Promise.all(songs.map(async (song: any) => {
        return await redis.set(`${CONSTANT.SONG_ID}:${song.id}`, 0);
    }))
    console.log('Set up view on redis successfully')
}

const updateViewSchedule = schedule.scheduleJob('* */15 * * * *', async function () {
    let songs = await models.song.findAll();
    await Promise.all(songs.map(async (song: any) => {
        let view = await redis.get(`${CONSTANT.SONG_ID}:${song.id}`);
        let viewRedis = parseInt(view as string) || 0;
        if(viewRedis!==0)
            await models.song.increment({ view: viewRedis }, { where: { id: song.id } })
        await redis.set(`${CONSTANT.SONG_ID}:${song.id}`, 0);

    }))
});

const countViewEveryHourSchedule = schedule.scheduleJob('0 0 * * * *', async () => {
    let timeStandard = convertTZ(new Date())
    let songs = await models.song.findAll();
    await Promise.all(songs.map(async (song: any) => {
        let view = await redis.get(`${CONSTANT.SONG_ID}:${song.id}`);
        return await redis.set(`${CONSTANT.SONG_ID}:${song.id}-${CONSTANT.TIME}:${timeStandard}`, parseInt(view as string), 'EX', 2 * 24 * 60 * 60);
    }))

});



export { setUpView, updateViewSchedule, countViewEveryHourSchedule }


