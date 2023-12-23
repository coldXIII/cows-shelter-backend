import { ApiProperty } from '@nestjs/swagger';

export class IUser {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  access_token: string;
}

export class NotFoundResponse {
  @ApiProperty({ default: 404 })
  status_code: number;
  @ApiProperty()
  message: string;
}

export class UploadImageResponse {
  @ApiProperty()
  imageUrl: string;
}

export class FileType {
  @ApiProperty()
  file: Express.Multer.File;
}
