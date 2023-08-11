// import {
//     Column,
//     Entity,
//     PrimaryGeneratedColumn,
//     CreateDateColumn,
//     ManyToOne,
//     OneToMany,
//   } from 'typeorm';
//   import { SingerModel } from './../singer/singer.model';
//   import { AlbumSongModel } from './../album-song/album-song.model';
  
//   @Entity({
//     name: 'songs'
//   })
//   export class SongModel {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;
  
//     @Column({ length: 255 })
//     name: string;
  
//     @Column({ length: 512, nullable: false })
//     url: string;
  
//     @Column({ default: 0 })
//     views: number;
  
//     @CreateDateColumn()
//     createdAt: Date;
  
//     // auto generated singerId in db, but use singer instead
//     @ManyToOne(() => SingerModel, (singer) => singer.songs) //, {onDelete: "SET NULL" }) //  cascade: delete all songs if singer is deleted
//     singer: SingerModel;
  
//     @OneToMany(() => AlbumSongModel, (albumSong) => albumSong.song)
//     albumSongs: AlbumSongModel[];
//   }