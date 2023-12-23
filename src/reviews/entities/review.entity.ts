import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'Review' })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_ua: string;

  @Column()
  name_en: string;

  @Column()
  review_ua: string;

  @Column()
  review_en: string;

  @CreateDateColumn()
  createdAt: Date;
}
