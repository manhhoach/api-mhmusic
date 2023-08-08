import { IsString, IsNotEmpty } from "class-validator";

export class ValidateUpdateUserDto {

    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}