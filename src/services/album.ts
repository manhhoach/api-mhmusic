import sequelize from './../db/config'
let models=sequelize.models;

export async function getAll(condition: any, pagination:{limit: number, offset: number}){
    return models.album.findAll({
        where: condition,
        limit: pagination.limit,
        offset: pagination.offset,
        order:[['createdDate','DESC']]
    });
}

export async function getOne(condition: any){
    return models.album.findOne({
        where: condition
    });
}


export async function create(data: any){
    return models.album.create(data)
}

export async function update(data: any, condition: any){
    return models.album.update(data, {where:condition})
}

export async function destroy(condition: any){
    return models.album.destroy({where :condition})
}