import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class GrpcValidationPipe implements PipeTransform {
    constructor(private dto: any) {
        
     }
    async transform(value: any, metadata: ArgumentMetadata) {
        console.log('v', value);
        
        const transformedValue = plainToClass(this.dto, value, {
            excludeExtraneousValues: true,
        });
        
        const errors = await validate(transformedValue)
        console.log(errors);
        return transformedValue;
    }
}
