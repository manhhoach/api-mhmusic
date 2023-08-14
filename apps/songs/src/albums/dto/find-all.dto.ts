import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class ValidateFindAllDto {
    @IsNumber()
    pageSize: number;

    @IsNumber()
    pageIndex: number;


    @IsString()
    @IsNotEmpty()
    order: string;
}