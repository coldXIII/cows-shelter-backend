import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
  ) {}

  async create(createGalleryDto: CreateGalleryDto) {
    return await this.galleryRepository.save(createGalleryDto);
  }

  async findAll() {
    const images = await this.galleryRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return images;
  }

  async findOne(id: number) {
    const image = await this.galleryRepository.findOne({
      where: { id },
    });
    if (!image) throw new NotFoundException('image not found');
    return image;
  }

  async remove(id: number) {
    const image = await this.galleryRepository.findOne({
      where: { id },
    });
    if (!image) throw new NotFoundException('image not found');
    await this.galleryRepository.delete(id);
    return { success: true };
  }

  async findAllWithPagination(page: number, limit: number) {
    const allImages = await this.findAll();
    const totalLength = allImages.length;
    const images = await this.galleryRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
    return { images, totalLength };
  }
}
