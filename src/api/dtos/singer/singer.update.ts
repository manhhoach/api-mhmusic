import { IsString, Length, IsNotEmpty } from "class-validator"


export default class SingerDto {
    @IsNotEmpty()
    @IsString()
    @Length(0, 255)
    name: string;
}