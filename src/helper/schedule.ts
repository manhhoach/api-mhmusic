import sequelize from '../db/config';
import redis from './../db/connectRedis';
import schedule from 'node-schedule'
import convertTZ from './convertTimeZone'
let models = sequelize.models;



const mapping = async () => {
    let songs = await models.song.findAll();
    await Promise.all(songs.map(async (song: any) => {
        return await redis.set(`songId:${song.id}`, song.view);
    }))
}

const mapViewSchedule = schedule.scheduleJob('* */15 * * * *', async function () {
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


const countViewEveryHourSchedule = schedule.scheduleJob ('0 0 * * * *', async()=>{
    let timeStandard = convertTZ(new Date())
    let songs = await models.song.findAll();
    await Promise.all(songs.map(async (song: any) => {
        let view = await redis.get(`songId:${song.id}`);
        return await redis.set(`SONGID:${song.id}-TIME:${timeStandard}`, parseInt(view as string), 'EX', 2*24*60*60); 
    }))
    
});



export {mapViewSchedule, countViewEveryHourSchedule}


