import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
const MAX_MB_SIZE = 25;

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const size = 1024 * 1024 * MAX_MB_SIZE;
        return value.size < size;
    }
}

@Injectable()
export class FileFormatValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value);
        
        return 1
    }
}