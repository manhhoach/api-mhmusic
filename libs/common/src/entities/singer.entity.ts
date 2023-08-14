import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { SongEntity } from './song.entity';

@Entity({
  name: 'singers',
})
export class SingerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @OneToMany(() => SongEntity, (song) => song.singer)
  songs: SongEntity[];
}
