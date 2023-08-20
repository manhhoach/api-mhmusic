import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SingerEntity } from './singer.entity';
import { AlbumSongEntity } from './album-songs.entity';

@Entity({
  name: 'songs',
})
export class SongEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 512, nullable: false })
  url: string;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  // auto generated singerId in db, but use singer instead
  @ManyToOne(() => SingerEntity, (singer) => singer.songs, {
    eager: true,
    onDelete: 'SET NULL',
  }) //, {onDelete: "SET NULL" }) //  cascade: delete all songs if singer is deleted
  singer: SingerEntity;

  @OneToMany(() => AlbumSongEntity, (albumSong) => albumSong.song)
  albumSongs: AlbumSongEntity[];
}
