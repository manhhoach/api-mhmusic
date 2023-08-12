import { IsString, IsNotEmpty } from "class-validator";
import { ValidateCreateSingerDto } from "./create-singer.dto";

export class ValidateUpdateSingerDto extends ValidateCreateSingerDto{
  @IsNotEmpty()
  @IsString()
  id: string;
}

// import { IsString, IsNotEmpty } from "class-validator";

// export class ValidateUpdateSingerDto {

//   @IsNotEmpty()
//   @IsString()
//   id: string;

//   @IsNotEmpty()
//   @IsString()
//   name: string;
// }