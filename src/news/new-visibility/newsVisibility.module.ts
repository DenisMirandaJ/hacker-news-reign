import { NewsVisibilityController } from './newsvisibility.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackerNews } from '../../db/news.entity';
import { NewsVisibilityService } from './newsVisibility.service.ts';

@Module({
  imports: [TypeOrmModule.forFeature([HackerNews])],
  controllers: [NewsVisibilityController],
  providers: [NewsVisibilityService],
})
export class NewsVisibilityModule {}
