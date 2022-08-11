import sequelize from './../db/config'
let models=sequelize.models;

export async function count(condition: any){
    return models.like.count({
        where: condition
    })
}

export async function create(data: any){
    return models.like.create(data)
}



export async function destroy(condition: any){
    return models.like.destroy({where :condition})
}