import { IsString, IsNotEmpty } from "class-validator";

export default class UserDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;
}