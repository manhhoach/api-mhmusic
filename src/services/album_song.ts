import sequelize from '../db/connectMysql'
let models = sequelize.models;

export async function getAll(condition: any) {
    return models.album_song.findAll({
        where: condition
    });
}

export async function getOne(condition: any): Promise<any> {
    return models.album_song.findAll({
        where: condition.album_song,
        include: [
            { model: models.album, where: condition.album },
            { model: models.song, where: condition.song }
        ]
    });
}

export async function create(data: any) {
    return models.album_song.create(data)
}

export async function update(data: any, condition: any) {
    return models.album_song.update(data, { where: condition })
}

export async function destroy(condition: any) {
    return models.album_song.destroy({ where: condition })
}