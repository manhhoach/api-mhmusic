import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 16)
    password: string;

}