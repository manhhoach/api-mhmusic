import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import Song from './song';
import AlbumSong from './album_song';

@Entity()
export default class Album {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(()=> AlbumSong, (albumSong)=>albumSong.album)
    albumSongs: AlbumSong[];


    // chatgpt
    // @ManyToMany(()=>Song, (song)=>song.albums)
    // @JoinTable({
    //     name: "album_song",
    //     joinColumn: {
    //         name: "albumId",
    //         referencedColumnName: "id"
    //     },
    //     inverseJoinColumn:{
    //         name:"songId",
    //         referencedColumnName: "id"
    //     }
    // })
    // songs: Song[]

}