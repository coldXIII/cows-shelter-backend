import { IsString, IsUrl } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  name: string;

  @IsString()
  logo: string;

  @IsUrl(undefined, { message: 'URL is not valid.' })
  link: string;

  @IsString()
  image_id: string;
}
