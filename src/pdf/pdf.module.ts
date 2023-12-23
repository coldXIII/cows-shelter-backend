import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { PDF } from './entities/pdf.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PDF])],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
