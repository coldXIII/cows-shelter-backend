import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateExcursionDto {
  @ApiProperty()
  @IsString()
  title_ua: string;

  @ApiProperty()
  @IsString()
  title_en: string;

  @ApiProperty()
  @IsString()
  description_ua: string;

  @ApiProperty()
  @IsString()
  description_en: string;

  @ApiProperty()
  @IsString()
  amount_of_persons: string;

  @ApiProperty()
  @IsString()
  time_from: string;

  @ApiProperty()
  @IsString()
  time_to: string;

  @ApiProperty()
  @IsUrl()
  image_url: string;

  @ApiProperty()
  @IsString()
  image_id: string;
}
