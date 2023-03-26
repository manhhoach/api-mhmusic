import { Length, IsNotEmpty, IsString } from "class-validator";

export default class AlbumDto { 
    @IsNotEmpty()
    @IsString()
    @Length(0, 255)
    name: string;
}