import { IsEmail, isEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
