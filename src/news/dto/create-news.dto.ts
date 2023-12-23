import { IsString, IsUrl } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  title_ua: string;

  @IsString()
  title_en: string;

  @IsString()
  subtitle_ua: string;

  @IsString()
  subtitle_en: string;

  @IsString()
  content_ua: string;

  @IsString()
  content_en: string;

  @IsUrl()
  image_url: string;

  @IsUrl()
  image_id: string;
}
