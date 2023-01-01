import { Sequelize, DataTypes,  Optional, ModelDefined } from "sequelize";

export interface ISinger {
    id: number;
    fullName: string;
    description: string;
    avatar: string;
    createdDate: Date;
}
type SingerCreationAttributes=Optional<ISinger, 'id'|'createdDate'|'avatar'>
export function createSinger (sequelize: Sequelize) {
   
    const Singer : ModelDefined<ISinger, SingerCreationAttributes> = sequelize.define('singer', {
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
            type: DataTypes.STRING(2048)
        },
        avatar: {
            type: new DataTypes.STRING(1024),
            defaultValue: '/user.png'
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, { timestamps: false })


    return Singer;
}

