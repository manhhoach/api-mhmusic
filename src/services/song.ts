import sequelize from '../db/config'
let models = sequelize.models;
import {Includeable} from 'sequelize'

export async function getAll(condition: any, pagination: { limit: number, offset: number }, singer: boolean = false, category: boolean = false) {
    
    let includes: Includeable|Includeable [] = [ ];
    if(singer)
        includes.push({ model: sequelize.models.singer })
    if(category) 
        includes.push({ model: sequelize.models.category })

    return models.song.findAll({
        where: condition,
        limit: pagination.limit,
        offset: pagination.offset,
        include: includes
    });
}



export async function getOne(condition: any, singer: boolean = false, category: boolean = false) {

    let includes: Includeable|Includeable [] = [ ];
    if(singer)
        includes.push({ model: sequelize.models.singer })
    if(category) 
        includes.push({ model: sequelize.models.category })
    return models.song.findOne({ where: condition,include: includes });
}

export async function create(data: any) {
    return models.song.create(data)
}

export async function update(data: any, condition: any) {
    return models.song.update(data, { where: condition })
}

export async function destroy(condition: any) {
    return models.song.destroy({ where: condition })
}