import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackerNews } from '../db/news.entity';
import { NewsLoadTimes } from '../db/options.entity';
import { LoadNewsService } from './load-news.service';

@Module({
  providers: [LoadNewsService],
  imports: [TypeOrmModule.forFeature([HackerNews, NewsLoadTimes])],
})
export class LoadNewsModule {}
