import { IsString, IsNotEmpty } from 'class-validator';

export class ValidateCreateSingerDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
