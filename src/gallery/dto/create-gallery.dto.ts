import { IsString, IsUrl } from 'class-validator';

export class CreateGalleryDto {
  @IsUrl()
  image_url: string;

  @IsString()
  image_id: string;
}
