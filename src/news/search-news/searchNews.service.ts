import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HackerNews } from '../../db/news.entity';
import { RawSearchFiltersDto } from './dto/searchFilters.dto';

@Injectable()
export class SearchNewsService {
  constructor(
    @InjectRepository(HackerNews)
    private hackerNewsRepository: Repository<HackerNews>,
  ) {}

  parseTagsQuery() {

  }

  findMany(@Query() filters: RawSearchFiltersDto) {
    return filters;
  }
}
