import nodeSchedule from 'node-schedule'
import redis from './../databases/redis'
import SongRepository from '../repositories/song';
import { REDIS_VARIABLES } from "../helpers/constant";


export const updateViewsOfAllSongs = nodeSchedule.scheduleJob('* */15 * * * *', async function () {
    let songRepository = new SongRepository();
    let songs = await songRepository.getAll({})
    await Promise.all(songs.map(async (song: any) => {
        let viewStr = `${REDIS_VARIABLES.SONG_ID}${song.id}`;
        let view: any = await redis.get(viewStr);
        view = parseInt(view as string) || 0;
        if (view !== 0)
        {
            await songRepository.increViews(song.id, view)
            await redis.set(viewStr, 0);
        }
    }))
});
