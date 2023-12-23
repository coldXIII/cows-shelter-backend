import { IsEmail, IsString } from 'class-validator';

export class CreatePasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  token: string;
}
