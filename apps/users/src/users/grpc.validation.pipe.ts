import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class GrpcValidationPipe implements PipeTransform {
    constructor(private dto: any){}
    transform(value: any, metadata: ArgumentMetadata) {
        return plainToClass(this.dto, value, {
            excludeExtraneousValues: true,
        
        })

        return value;
    }
}
