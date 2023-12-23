import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { of } from 'rxjs';
import { removeFile, saveImageToStorage } from 'src/helpers/image-storage';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('pagination')
  findAllWithPagination(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 2,
  ) {
    return this.newsService.findAllWithPagination(+page, +limit);
  }

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, imageUrl: string) {
    const filePath = join(process.cwd(), 'uploads/images' + '/' + imageUrl);
    removeFile(filePath);
    return this.newsService.remove(+id);
  }

  @Post('upload-to-server')
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
