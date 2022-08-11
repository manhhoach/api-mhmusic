import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

export interface ICategory extends Model<InferAttributes<ICategory>, InferCreationAttributes<ICategory>> {
    id: CreationOptional<number>;
    name: string;
    parentId: number;
    createdDate: CreationOptional<Date>;
}


export function createCategory(sequelize: Sequelize) {
    
    const Category = sequelize.define<ICategory>('category', {
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
        parentId:{
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

