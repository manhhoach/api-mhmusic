import { IsNumber, IsUUID } from 'class-validator';

export class ValidateFindDetailDto {
  @IsUUID()
  albumId: string;

  @IsNumber()
  pageSize: number;

  @IsNumber()
  pageIndex: number;
}
