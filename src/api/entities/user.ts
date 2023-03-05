import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import classValidator ,{ Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from "class-validator"
import bcryptjs from 'bcryptjs'

@Entity()
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    @IsEmail(undefined, {
        message: 'Invalid email format',
    })
    email: string;


    @Column({ nullable: false, select: false })
    @Length(8, 16, {
        message: 'Password must be between 8 and 16 characters'
    })
    password: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @Column({ type: 'integer', default: 0 })
    type: number;

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword() {
        console.log('password hashing');
        const salt = bcryptjs.genSaltSync(10)
        this.password = bcryptjs.hashSync(this.password, salt)
    }

    comparePassword(password: string): boolean {
        return bcryptjs.compareSync(password, this.password)
    }

}