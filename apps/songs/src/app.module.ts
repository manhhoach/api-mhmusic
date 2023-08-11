import { Module } from '@nestjs/common';
import { SingersModule } from './singers/singers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config'

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        SingersModule
    ],
    providers: [],
    exports: [],
})
export class AppModule { }
