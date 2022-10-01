import sequelize from '../db/config'
let models = sequelize.models;
import { Includeable } from 'sequelize'
import { Order } from 'sequelize';

export async function getAll(condition: any, pagination: { limit: number, offset: number }, singer: boolean = false, category: boolean = false, order: boolean = false) {

    let includes: Includeable | Includeable[] = [];
    if (singer)
        includes.push({ model: sequelize.models.singer })
    if (category)
        includes.push({ model: sequelize.models.category })

    let orderCreatedDate: Order | undefined = order ? [['createdDate', 'DESC']] : undefined;

    return models.song.findAll({
        where: condition,
        limit: pagination.limit,
        offset: pagination.offset,
        order: orderCreatedDate,
        include: includes
    });
}



export async function getOne(condition: any, singer: boolean = false, category: boolean = false) {

    let includes: Includeable | Includeable[] = [];
    if (singer)
        includes.push({ model: sequelize.models.singer })
    if (category)
        includes.push({ model: sequelize.models.category })
    return models.song.findOne({ where: condition, include: includes });
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

export async function getTop(limit: number, singer: boolean = false, category: boolean = false) {

    let includes: Includeable | Includeable[] = [];
    if (singer)
        includes.push({ model: sequelize.models.singer })
    if (category)
        includes.push({ model: sequelize.models.category })

    return models.song.findAll({
        limit: limit,
        order: [['view', 'DESC']],
        include: includes
    });
}