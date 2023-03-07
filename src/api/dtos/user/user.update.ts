import { IsString, Length, IsNotEmpty, IsOptional, IsEmail } from "class-validator"


export default class UserDto {
    @IsOptional()
    @IsNotEmpty()
    name?: string;
    
    constructor(data: any) {
        this.name = data.name;
    }
}