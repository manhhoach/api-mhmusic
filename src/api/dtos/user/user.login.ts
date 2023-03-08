import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator"


export default class UserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 16)
    password: string;

    // constructor(data: any) {
    //     this.email = data.email;
    //     this.password = data.password;
    // }
}