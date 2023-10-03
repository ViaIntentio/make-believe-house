import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {

  @IsString()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 3,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;
  
}
