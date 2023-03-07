import { IsString, IsEmail, Length } from "class-validator"


export default class UserDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 16)
    password: string;

    constructor(data: any) {
        this.email = data.email;
        this.password = data.password;
    }
}