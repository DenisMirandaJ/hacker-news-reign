import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { HighlightResult } from '../news/load-news/interfaces/hackerNewsApiResponse.type';

@Entity()
export class HackerNews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  created_at: Date;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  url?: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  points?: number;

  @Column({ nullable: true })
  story_text?: string;

  @Column({ nullable: true })
  comment_text?: string;

  @Column({ nullable: true })
  num_comments?: number;

  @Column({ nullable: true })
  story_id?: number;

  @Column({ nullable: true })
  story_title?: string;

  @Column({ nullable: true })
  story_url?: string;

  @Column({ nullable: true })
  parent_id?: number;

  @Column()
  created_at_i: number;

  @Column({ type: 'text', array: true, default: [] })
  _tags: string[];

  @Column()
  objectID: string;

  @Column({ type: 'json', nullable: true })
  _highlightResult: HighlightResult;

  @Column({ type: 'boolean', default: false })
  hidden: boolean;
}
