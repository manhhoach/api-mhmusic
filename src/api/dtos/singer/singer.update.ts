import { IsString, Length, IsNotEmpty, IsOptional } from "class-validator"


export default class SingerDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(0, 255)
    name: string;
    
    constructor(data: any) {
        this.name = data.name;
    }
}