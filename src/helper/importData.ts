
import fs from 'fs';


export default async function importData(sequelizeConnection: any, path: string, modelName: string){
    let users=fs.readFileSync(path, {encoding: 'utf-8'} );
    let data=JSON.parse(users).RECORDS;
    await sequelizeConnection.models[modelName].bulkCreate(data)
    console.log('import successfully');
}

