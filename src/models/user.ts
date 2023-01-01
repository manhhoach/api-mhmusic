import { Sequelize, DataTypes, Optional, ModelDefined, Model } from "sequelize";
import bcryptjs from "bcryptjs";
// import {
//     validate, validateOrReject, Contains, IsInt, Length, IsEmail, 
//     IsFQDN, IsDate, Min, Max,
//   } from 'class-validator';

export interface IUser{
    id: number;
    fullName: string;
    email: string;
    password: string;
    type: number;
    avatar: string;
    createdDate: Date;

}
type UserCreationAttributes = Optional<IUser, 'id'|'createdDate'|'avatar'|'type'>
export function createUser (sequelize: Sequelize) {

    const User: ModelDefined<IUser, UserCreationAttributes> = sequelize.define('user', {
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

    User.afterValidate((user: any)=>{
        if(user.password)   
        {
            let salt=bcryptjs.genSaltSync(10)
            user.password=bcryptjs.hashSync(user.password, salt)
        }
    })
    return User;
}

