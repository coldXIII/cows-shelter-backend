import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'Excursion' })
export class Excursion {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Title in En' })
  @Column()
  title_en: string;

  @ApiProperty({ description: 'Title in Ua' })
  @Column()
  title_ua: string;

  @ApiProperty({ description: 'Text in En' })
  @Column()
  description_en: string;

  @ApiProperty({ description: 'Text in Ua' })
  @Column()
  description_ua: string;

  @ApiProperty({ description: 'Amount of Persons for excursion' })
  @Column()
  amount_of_persons: string;

  @ApiProperty({ description: 'Min duration of excursion' })
  @Column()
  time_from: string;

  @ApiProperty({ description: 'Max duration of excursion' })
  @Column()
  time_to: string;

  @ApiProperty({ description: 'Image Url' })
  @Column()
  image_url: string;

  @ApiProperty({ description: 'cloudinary public id for image' })
  @Column()
  image_id: string;

  @CreateDateColumn()
  createdAt: Date;
}
