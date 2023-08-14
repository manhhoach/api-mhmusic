import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { SongEntity } from './song.entity';
import { AlbumEntity } from './album.entity';

@Entity({
  name: 'album_songs',
})
@Unique('album_song_unique', ['album', 'song'])
export class AlbumSongEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => AlbumEntity, (album) => album.albumSongs, {
    onDelete: 'CASCADE',
  })
  album: AlbumEntity;

  @ManyToOne(() => SongEntity, (song) => song.albumSongs, {
    onDelete: 'CASCADE',
  })
  song: SongEntity;
}
