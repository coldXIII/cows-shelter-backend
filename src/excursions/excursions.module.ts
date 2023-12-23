import { Module } from '@nestjs/common';
import { ExcursionsService } from './excursions.service';
import { ExcursionsController } from './excursions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Excursion } from './entities/excursion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Excursion])],
  controllers: [ExcursionsController],
  providers: [ExcursionsService],
})
export class ExcursionsModule {}
