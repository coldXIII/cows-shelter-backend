import { IsString, IsUrl } from 'class-validator';

export class CreatePdfDto {
  @IsString()
  title: string;

  @IsUrl()
  document_url: string;

  @IsString()
  document_id: string;
}
