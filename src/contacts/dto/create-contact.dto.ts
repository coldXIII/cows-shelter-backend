import { IsEmail, IsString } from 'class-validator';

export class CreateContactDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}
