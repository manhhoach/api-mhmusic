import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

export interface ISinger extends Model<InferAttributes<ISinger>, InferCreationAttributes<ISinger>>{
    id: CreationOptional<number>;
    fullName: string;
    description: string;
    avatar: string;
    createdDate: CreationOptional<Date>;
}
export function createSinger (sequelize: Sequelize) {
   
    const Singer = sequelize.define<ISinger>('singer', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        fullName: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1024)
        },
        avatar: {
            type: new DataTypes.STRING(1024),
            defaultValue: 'xxx.jpg'
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, { timestamps: false })


    return Singer;
}

