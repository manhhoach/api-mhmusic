import nodeSchedule from 'node-schedule'
import SongRepository from '../repositories/song';
import { REDIS_VARIABLES } from "../helpers/constant";
import convertTZ from './convertTimeZone'
import redis from './../databases/redis'

export const updateViewsOfAllSongs = nodeSchedule.scheduleJob('* */15 * * * *', async function () {

    let songRepository = new SongRepository();
    let allSongs = await songRepository.hgetAll(REDIS_VARIABLES.HASHES_VIEW_SONGS)
    await Promise.all(Object.keys(allSongs).map(async (ele) => {
        let view = parseInt(allSongs[ele]);
        console.log(view, ele);

        await songRepository.increViews(ele, view)
    }))
    await songRepository.del(REDIS_VARIABLES.HASHES_VIEW_SONGS)
});

export const countViewEveryHourSchedule = nodeSchedule.scheduleJob('0 0 * * * *', async () => {
    let songRepository = new SongRepository();
    let timeStandard = convertTZ(new Date())
    let songs = await songRepository.getAll({});
    await Promise.all(songs.map(async (song) => {
        await redis.set(`${REDIS_VARIABLES.TIME}${timeStandard}-${REDIS_VARIABLES.SONG_ID}${song.id}`, song.views, 'EX', REDIS_VARIABLES.EXPIRED_TIME_CHART);
    }))


});