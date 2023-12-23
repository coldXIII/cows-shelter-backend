import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
  Query,
  Req,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { of } from 'rxjs';
import { removeFile, saveImageToStorage } from 'src/helpers/image-storage';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get('pagination')
  findAllWithPagination(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 2,
  ) {
    return this.partnersService.findAllWithPagination(+page, +limit);
  }

  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnersService.create(createPartnerDto);
  }

  @Get()
  findAll() {
    return this.partnersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnersService.update(+id, updatePartnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, imageUrl: string) {
    const filePath = join(process.cwd(), 'uploads/images' + '/' + imageUrl);
    removeFile(filePath);
    return this.partnersService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadFileToServer(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): any {
    const fileName = file?.filename;
    if (!fileName) return of({ error: 'File must be an image' });
    const imageFolderPath = join(process.cwd(), 'uploads/images');
    const imageUrl = join(imageFolderPath + '/' + fileName);
    return imageUrl;
  }
}
