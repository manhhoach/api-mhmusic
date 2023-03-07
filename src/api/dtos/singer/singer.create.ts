import { Length, IsNotEmpty, IsString } from "class-validator"

export default class SingerDto {
    @IsString()
    @IsNotEmpty()
    @Length(0, 255)
    name: string;
    
    // constructor(data: any) {
    //     this.name = data.name;
    // }
}