import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { of } from 'rxjs';
import { removeFile, saveImageToStorage } from 'src/helpers/image-storage';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get('pagination')
  findAllWithPagination(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 2,
  ) {
    return this.galleryService.findAllWithPagination(+page, +limit);
  }

  @Post()
  create(@Body() createGalleryDto: CreateGalleryDto) {
    return this.galleryService.create(createGalleryDto);
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, imageUrl: string) {
    const filePath = join(process.cwd(), 'uploads/images' + '/' + imageUrl);
    removeFile(filePath);
    return this.galleryService.remove(+id);
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
    const imageFolderPath = join(process.cwd(), 'src/uploads/images');
    const imageUrl = join(imageFolderPath + '/' + fileName);
    return imageUrl;
  }
}
