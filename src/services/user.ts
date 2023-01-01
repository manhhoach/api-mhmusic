import sequelize from '../db/connectMysql'
let models = sequelize.models;

export async function getAll(condition: any) {
    return models.user.findAll({
        where: condition,

    });
}

export async function getOne(condition: any, getPassword: boolean) {
    return models.user.findOne({
        where: condition,
        attributes: getPassword ? undefined : { exclude: ['password'] }
    });
}


export async function create(data: any) {
    return models.user.create(data)
}

export async function update(data: any, condition: any) {
    return models.user.update(data, { where: condition })
}

export async function destroy(condition: any) {
    return models.user.destroy({ where: condition })
}