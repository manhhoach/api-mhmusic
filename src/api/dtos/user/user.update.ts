import { IsString, Length, IsNotEmpty, IsOptional, IsEmail } from "class-validator"


export default class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
    
    @IsOptional()
    @IsString()
    @Length(8, 16)
    password?: string;

    constructor(data: any) {
        this.name = data.name;
        this.password = data.password;
        this.email = data.email;
    }
}