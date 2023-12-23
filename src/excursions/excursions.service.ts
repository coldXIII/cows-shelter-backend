import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExcursionDto } from './dto/create-excursion.dto';
import { UpdateExcursionDto } from './dto/update-excursion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Excursion } from './entities/excursion.entity';

@Injectable()
export class ExcursionsService {
  constructor(
    @InjectRepository(Excursion)
    private readonly excursionsRepository: Repository<Excursion>,
  ) {}

  async create(createExcursionDto: CreateExcursionDto) {
    return await this.excursionsRepository.save(createExcursionDto);
  }

  async findAll() {
    return this.excursionsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const post = await this.excursionsRepository.findOne({
      where: { id },
    });
    if (!post) throw new NotFoundException('This excursion not found');
    return post;
  }

  async update(id: number, updateExcursionDto: UpdateExcursionDto) {
    const excursion = await this.excursionsRepository.findOne({
      where: {
        id,
      },
    });
    if (!excursion) throw new NotFoundException('This excursion not found');
    await this.excursionsRepository.update(id, updateExcursionDto);
    return { success: true };
  }

  async remove(id: number) {
    const excursion = await this.excursionsRepository.findOne({
      where: {
        id,
      },
    });
    if (!excursion) throw new NotFoundException('This excursion not found');
    await this.excursionsRepository.delete(id);
    return {
      success: true,
    };
  }

  async findAllWithPagination(page: number, limit: number) {
    const allExcurions = await this.findAll();
    const totalLength = allExcurions.length;
    const excursions = await this.excursionsRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
    return { excursions, totalLength };
  }
}
