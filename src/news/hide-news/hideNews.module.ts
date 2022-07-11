import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackerNews } from '../../db/news.entity';
import { HideNewsService } from './hideNews.service';

@Module({
  imports: [TypeOrmModule.forFeature([HackerNews])],
  controllers: [],
  providers: [HideNewsService],
})
export class HideNewsModule {}
