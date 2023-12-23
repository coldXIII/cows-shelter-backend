import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'News' })
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title_en: string;

  @Column()
  title_ua: string;

  @Column()
  subtitle_en: string;

  @Column()
  subtitle_ua: string;

  @Column()
  content_en: string;

  @Column()
  content_ua: string;

  @Column()
  image_url: string;

  @Column()
  image_id: string;

  @CreateDateColumn()
  createdAt: Date;
}
