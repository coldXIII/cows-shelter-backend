import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
