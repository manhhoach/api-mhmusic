import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm'
import Singer from './singer'
import Album from './album';
import AlbumSong from './album_song';

@Entity()
export default class Song {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 512, nullable: false })
    url: string;

    @Column({type: 'integer', default: 0})
    view: number;

    @CreateDateColumn()
    createdAt: Date;
    
    
    // auto generated singerId in db, but use singer instead
    @ManyToOne(()=>Singer, (singer)=>singer.songs) //, {onDelete: "SET NULL" }) //  cascade: delete all songs if singer is deleted
    singer: Singer;


    @OneToMany(()=>AlbumSong, (albumSong)=>albumSong.song)
    albumSongs: AlbumSong[]


    // chatgpt
    // @ManyToMany(()=>Album, (album)=>album.songs)
    // albums: Album[]

    // @OneToMany(()=>AlbumSong, (albumSong)=>albumSong.song)
    // albumSongs: AlbumSong[]

}