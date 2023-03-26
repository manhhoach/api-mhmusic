import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, Column, ManyToOne, Unique } from 'typeorm';
import Song from './song';
import Album from './album';

@Entity()
@Unique("album_song_unique", ["album", "song"])
export default class AlbumSong {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column({type: 'uuid'})
    // albumId: string

    // @Column({type: 'uuid'})
    // songId: string

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(()=>Album, (album)=>album.albumSongs)
    album: Album;
        
    @ManyToOne(()=>Song, (song)=>song.albumSongs)
    song: Song;



    // chatgpt
    // @PrimaryGeneratedColumn('uuid')
    // id: string;

    // @CreateDateColumn()
    // createdAt: Date;

    // @ManyToMany(()=>Album, (album)=>album.id)
    // album: Album;
        
    // @ManyToMany(()=>Song, (song)=>song.id)
    // song: Song;

    
}
