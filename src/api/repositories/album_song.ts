import AlbumSong from './../entities/album_song';
import BaseRepository from './base';


export default class AlbumSongRepository extends BaseRepository<AlbumSong>{
    constructor() {
        super(AlbumSong);
    }

    getDetailById(albumId: string, limit: number, offset: number): Promise<[AlbumSong[], number]> {
        return this.repository.createQueryBuilder("albumSong")
            .where("albumSong.album = :albumId", { albumId: albumId })
            .innerJoinAndSelect("albumSong.song", "song")
            //.innerJoin("albumSong.album", "album")
            .select(["song.id", "song.name", "song.url", "song.view", "albumSong"])
            .take(limit).skip(offset)
            .orderBy({ "albumSong.createdAt": "DESC" })
            .getManyAndCount();
    }
}