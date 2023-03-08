import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinTable } from 'typeorm'
import Singer from './singer'

@Entity()
export default class Song {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 512, nullable: false })
    url: string;
    
    // auto generated singerId in db, but use singer instead
    @ManyToOne(()=>Singer, (singer)=>singer.songs) //, {onDelete: "SET NULL" }) //  cascade: delete all songs if singer is deleted
    singer: Singer;

    // @JoinTable()
    // singerInfo: Singer

    @Column({type: 'integer', default: 0})
    view: number;

    @CreateDateColumn()
    createdAt: Date;

}