import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class UpdateUserDto {

    @IsNotEmpty()
    @IsString()
    id: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    type: number;
}