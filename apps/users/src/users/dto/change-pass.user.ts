import { IsString, IsNotEmpty } from "class-validator";

export class ValidateChangePassUserDto {

    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    currentPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}