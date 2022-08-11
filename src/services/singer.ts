import sequelize from './../db/config'
let models=sequelize.models;

export async function getAll(condition: any){
    return models.singer.findAll({
        where: condition
    });
}

export async function getOne(condition: any){
    return models.singer.findOne({where: condition});
}

export async function create(data: any){
    return models.singer.create(data)
}

export async function update(data: any, condition: any){
    return models.singer.update(data, {where:condition})
}

export async function destroy(condition: any){
    return models.singer.destroy({where :condition})
}