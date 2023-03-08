import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'
import Song from './song'

@Entity()
class Singer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    
    @OneToMany(()=>Song, (song)=>song.singer)
    songs: Song[];

    @CreateDateColumn({ select: false })
    createdAt: Date;

    
}
export default Singer