import {  IsNotEmpty, IsString, IsUUID } from "class-validator";

export default class AlbumSongDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    album: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    song: string; 
}