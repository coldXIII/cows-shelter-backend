import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    return await this.newsRepository.save(createNewsDto);
  }

  async findAll() {
    return this.newsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const post = await this.newsRepository.findOne({
      where: { id },
    });
    if (!post) throw new NotFoundException('This post not found');
    return post;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const post = await this.newsRepository.findOne({
      where: { id },
    });
    if (!post) throw new NotFoundException('This post not found');
    return await this.newsRepository.update(id, updateNewsDto);
  }

  async remove(id: number) {
    const post = await this.newsRepository.findOne({
      where: { id },
    });
    if (!post) throw new NotFoundException('This post not found');
    await this.newsRepository.delete(id);
    return { success: true };
  }

  async findAllWithPagination(page: number, limit: number) {
    const allPosts = await this.findAll();
    const totalLength = allPosts.length;
    const posts = await this.newsRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
    return { posts, totalLength };
  }
}
