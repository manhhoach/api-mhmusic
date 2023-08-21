import { IsNumber, IsUUID } from 'class-validator';

export class ValidateFindDetailDto {
  @IsUUID()
  id: string;

  @IsNumber()
  pageSize: number;

  @IsNumber()
  pageIndex: number;
}
