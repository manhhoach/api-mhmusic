import { Injectable } from '@nestjs/common';


@Injectable()
export class UploadsService {
  create(createUploadDto) {
    return 'This action adds a new upload';
  }


  update(id: number, updateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
