import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UploadsService } from './uploads.service';


@Controller()
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}


}
