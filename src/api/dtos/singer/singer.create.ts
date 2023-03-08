import { Length, IsNotEmpty, IsString } from "class-validator"


export default class SingerDto { 
    @IsNotEmpty()
    @IsString()
    @Length(0, 255)
    name: string;
    
    // constructor(data: any) {
    //     this.name = data.name;
    // }
}