import {  IsNotEmpty, IsString, IsUUID } from "class-validator"

export default class AlbumSongDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    albumId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    songId: string; 
}