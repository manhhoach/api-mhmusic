import {DataSourceOptions} from 'typeorm'
import 'dotenv/config';
import User from './../api/entities/user'

export const ORM_CONFIG: DataSourceOptions={
    type: "postgres",
    host: process.env.DB_HOST,
    port:  parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    //synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
}