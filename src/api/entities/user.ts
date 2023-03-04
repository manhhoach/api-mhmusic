import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import { Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from "class-validator"
import bcryptjs from 'bcryptjs'

@Entity()
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    @IsEmail()
    email: string;

    @Column({ nullable: false })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({type: 'integer', default: 0})
    type: number;
    

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const salt = bcryptjs.genSaltSync(10)
        this.password = bcryptjs.hashSync(this.password, salt)
    }


}