import { Length, IsNotEmpty, IsString, IsUUID, IsUrl} from "class-validator";

export default class SongDto { 
    @IsNotEmpty()
    @IsString()
    @Length(0, 255)
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    @Length(0, 255)
    url: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    singer: string; 

}