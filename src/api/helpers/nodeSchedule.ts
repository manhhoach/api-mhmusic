import nodeSchedule from 'node-schedule'
import SongRepository from '../repositories/song';
import { REDIS_VARIABLES } from "../helpers/constant";
import moment from 'moment-timezone';

export const updateViewsOfAllSongs = nodeSchedule.scheduleJob(`* */${REDIS_VARIABLES.VIEWS_UPDATE_MINUTES} * * * *`, async function () {

    let songRepository = new SongRepository();
    let allSongs = await songRepository.hgetAll(REDIS_VARIABLES.HASHES_VIEW_SONGS)
    await Promise.all(Object.keys(allSongs).map(async (ele) => {
        let view = parseInt(allSongs[ele]);
        await songRepository.increViews(ele, view)
    }))
    await songRepository.del(REDIS_VARIABLES.HASHES_VIEW_SONGS)
});

export const countViewEveryHourSchedule = nodeSchedule.scheduleJob('0 0 * * * *', async () => {
    let songRepository = new SongRepository();
    let time = moment().tz('Asia/Ho_Chi_Minh').format(REDIS_VARIABLES.FORMAT_TIME)
    let songs = await songRepository.getAll({});
    await Promise.all(songs.map(async (song) => {
        await songRepository.setKeyWithExpiredTime(`${time}-${REDIS_VARIABLES.SONG_ID}${song.id}`, song.views, REDIS_VARIABLES.EXPIRED_TIME_ELEMENT_CHART);
    }))
});