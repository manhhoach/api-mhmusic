import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import bcryptjs from "bcryptjs";
// import {
//     validate, validateOrReject, Contains, IsInt, Length, IsEmail, 
//     IsFQDN, IsDate, Min, Max,
//   } from 'class-validator';

export interface IUser extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>>{
    id: CreationOptional<number>;
    fullName: string;
    email: string;
    password: string;
    type: number; // k đánh dấu creation optional xem
    avatar: string;
    createdDate: CreationOptional<Date>;

}
export function createUser (sequelize: Sequelize) {

    const User = sequelize.define<IUser>('user', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        fullName: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: new DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        password: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        avatar: {
            type: new DataTypes.STRING(1024),
            defaultValue: '/user.png'
        },
        type: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, { timestamps: false })

    User.afterValidate((user)=>{
        if(user.password)   
        {
            let salt=bcryptjs.genSaltSync(10)
            user.password=bcryptjs.hashSync(user.password, salt)
        }
    })
    return User;
}

