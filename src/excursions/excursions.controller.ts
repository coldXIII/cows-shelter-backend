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
import { ExcursionsService } from './excursions.service';
import { CreateExcursionDto } from './dto/create-excursion.dto';
import { UpdateExcursionDto } from './dto/update-excursion.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { of } from 'rxjs';
import { removeFile, saveImageToStorage } from 'src/helpers/image-storage';

@Controller('excursions')
export class ExcursionsController {
  constructor(private readonly excursionsService: ExcursionsService) {}

  @Get('pagination')
  findAllWithPagination(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 2,
  ) {
    return this.excursionsService.findAllWithPagination(+page, +limit);
  }

  @Post()
  create(@Body() createExcursionDto: CreateExcursionDto) {
    return this.excursionsService.create(createExcursionDto);
  }

  @Get()
  findAll() {
    return this.excursionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.excursionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExcursionDto: UpdateExcursionDto,
  ) {
    return this.excursionsService.update(+id, updateExcursionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, imageUrl: string) {
    const filePath = join(process.cwd(), 'uploads/images' + '/' + imageUrl);
    removeFile(filePath);
    return this.excursionsService.remove(+id);
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
