import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator"


export default class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 16)
    password: string;

    constructor(data: any) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }
}