import { IsString, Length } from "class-validator"


export default class UserDto {
    

    @IsString()
    @Length(8, 16)
    oldPassword: string;

    @IsString()
    @Length(8, 16)
    newPassword: string;

    constructor(data: any) {
        this.newPassword = data.newPassword;
        this.oldPassword = data.oldPassword;
    }
}