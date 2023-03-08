import { Length, IsNotEmpty, IsString, IsUUID} from "class-validator"


export default class SongDto { 
    @IsNotEmpty()
    @IsString()
    @Length(0, 255)
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(0, 255)
    url: string;

    @IsString()
    @Length(0, 255)
    performSinger: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    singer: string; 

}