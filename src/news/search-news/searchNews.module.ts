import { SearchNewsService } from './searchNews.service';
import { Module } from '@nestjs/common';
import { HackerNews } from '../../db/news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchNewsController } from './searchNews.controller';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([HackerNews]), AuthModule],
  controllers: [SearchNewsController],
  providers: [SearchNewsService],
})
export class SearchNewsModule {}
