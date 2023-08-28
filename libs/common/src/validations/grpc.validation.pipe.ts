import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RpcException } from '@nestjs/microservices';
import { MESSAGES } from '@app/common';

@Injectable()
export class GrpcValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    try {
      const object = plainToInstance(metatype, value);
      const errors = await validate(object);
      if (errors.length > 0) {
        throw new BadRequestException(MESSAGES.VALIDATION_ERROR);
      }
      return value;
    } catch (error) {
      throw new RpcException(JSON.stringify(error.response));
    }
  }

  // private toValidate(metatype: Function): boolean {
  //   const types: Function[] = [String, Boolean, Number, Array, Object];
  //   return !types.includes(metatype);
  // }
}
