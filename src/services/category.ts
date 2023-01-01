import sequelize from '../db/connectMysql'
let models=sequelize.models;

export async function getAll(condition: any){
    return models.category.findAll({
        where: condition
    });
}

export async function getOne(condition: any){
    return models.category.findOne({
        where: condition
    });
}


export async function create(data: any){
    return models.category.create(data)
}

export async function update(data: any, condition: any){
    return models.category.update(data, {where:condition})
}

export async function destroy(condition: any){
    return models.category.destroy({where :condition})
}