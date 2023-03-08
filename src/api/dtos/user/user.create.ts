import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator"


export default class UserDto {
    
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

    // constructor(data: any) {
    //     this.name = data.name;
    //     this.email = data.email;
    //     this.password = data.password;
    // }
}