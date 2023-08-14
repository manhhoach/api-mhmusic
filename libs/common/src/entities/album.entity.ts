import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { AlbumSongEntity } from './album-songs.entity';

@Entity({
    name: 'albums'
})
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => AlbumSongEntity, (albumSong) => albumSong.album)
    albumSongs: AlbumSongEntity[];
}
