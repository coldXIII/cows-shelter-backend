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
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { of } from 'rxjs';
import { removeFile, saveDocumentToStorage } from 'src/helpers/image-storage';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  create(@Body() createPdfDto: CreatePdfDto) {
    return this.pdfService.create(createPdfDto);
  }

  @Get()
  findAll() {
    return this.pdfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pdfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePdfDto: UpdatePdfDto) {
    return this.pdfService.update(+id, updatePdfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, documentUrl: string) {
    const filePath = join(process.cwd(), 'uploads/pdf' + '/' + documentUrl);
    removeFile(filePath);
    return this.pdfService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', saveDocumentToStorage))
  uploadFileToServer(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): any {
    const fileName = file?.filename;
    if (!fileName) return of({ error: 'File must be PDF document' });
    const imageFolderPath = join(process.cwd(), 'uploads/pdf');
    const imageUrl = join(imageFolderPath + '/' + fileName);
    return imageUrl;
  }
}
