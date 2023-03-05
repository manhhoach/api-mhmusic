import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'


@Entity()
export default class Song {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 512, nullable: false })
    url: string;

    @Column({type: 'number'})
    singerId: number;

    @Column({ type: 'varchar', length: 512, default: 'unknown'})
    performSinger: string;

    @Column({type: 'number', default: 0})
    view: number;

    @CreateDateColumn({ select: false })
    createdAt: Date;

}