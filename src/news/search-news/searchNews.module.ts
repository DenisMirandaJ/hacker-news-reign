import { SearchNewsService } from './searchNews.service';
import { Module } from '@nestjs/common';
import { HackerNews } from '../../db/news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HackerNews])],
  controllers: [],
  providers: [SearchNewsService],
})
export class SearchNewsModule {}
