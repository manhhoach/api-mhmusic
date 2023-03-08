import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export default class Album {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

}