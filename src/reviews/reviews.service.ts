import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    return await this.reviewRepository.save(createReviewDto);
  }

  async findAll() {
    return this.reviewRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const post = await this.reviewRepository.findOne({
      where: { id },
    });
    if (!post) throw new NotFoundException('This excursion not found');
    return post;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne({
      where: { id },
    });
    if (!review) throw new NotFoundException('This review not found');
    await this.reviewRepository.update(id, updateReviewDto);
    return { success: true };
  }

  async remove(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
    });
    if (!review) throw new NotFoundException('This review not found');
    await this.reviewRepository.delete(id);
    return { success: true };
  }

  async findAllWithPagination(page: number, limit: number) {
    const allReviews = await this.findAll();
    const totalLength = allReviews.length;
    const reviews = await this.reviewRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
    return { reviews, totalLength };
  }
}
