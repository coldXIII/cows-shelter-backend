import { IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name_ua: string;

  @IsString()
  name_en: string;

  @IsString()
  review_ua: string;

  @IsString()
  review_en: string;
}
