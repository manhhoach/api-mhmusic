import { IsNotEmpty, IsString, Length } from "class-validator";

export default class UserDto {
    
    @IsNotEmpty()
    @IsString()
    @Length(8, 16)
    oldPassword: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(8, 16)
    newPassword: string;


}