import { DataSource } from "typeorm";
import { ORM_CONFIG } from "../../config/ormConfig";

export const AppDataSource = new DataSource(ORM_CONFIG)