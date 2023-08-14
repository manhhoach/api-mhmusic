import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

@Entity({
  name: 'users',
})
export class UserEntity {
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
    message: 'Password must be between 8 and 16 characters',
  })
  password: string;

  @Column({ type: 'integer', default: 0 })
  type: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    if (this.password) {
      const salt = genSaltSync(10);
      this.password = hashSync(this.password, salt);
    }
  }

  comparePassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}
