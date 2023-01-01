import { Sequelize, DataTypes, Optional, ModelDefined } from "sequelize";

export interface ICategory {
    id: number;
    name: string;
    parentId: number;
    createdDate: Date;
}
type CategoryCreationAttributes = Optional<ICategory, 'id' | 'parentId' | 'createdDate'>

export function createCategory(sequelize: Sequelize) {

    const Category: ModelDefined<ICategory, CategoryCreationAttributes> = sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        parentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, { timestamps: false })


    return Category;
}

