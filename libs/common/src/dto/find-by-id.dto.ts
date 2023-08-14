import { IsUUID } from 'class-validator';

export class ValidateFindByIdDto {
  @IsUUID()
  id: string;
}
