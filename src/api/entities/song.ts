import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm'
import Singer from './singer'

@Entity()
export default class Song {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 512, nullable: false })
    url: string;
    
    @ManyToOne(()=>Singer, (singer)=>singer.songs) /// auto generated singerId in db, but use singer id instead
    singer: Singer;

    @Column({ type: 'varchar', length: 512, default: 'unknown'})
    performSinger: string;

    @Column({type: 'integer', default: 0})
    view: number;

    @CreateDateColumn()
    createdAt: Date;

}