import { Length, IsNotEmpty, IsString, IsUUID, IsUrl, IsOptional} from "class-validator"

export default class SongDto { 
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(0, 255)
    name: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    @Length(0, 255)
    url: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    singer: string; 

}