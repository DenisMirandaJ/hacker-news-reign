import { Controller, Get, Query } from '@nestjs/common';
import { QueryFiltersDto } from './dto/searchFilters.dto';
import { SearchNewsService } from './searchNews.service';

@Controller('search')
export class SearchNewsController {
  constructor(private searchNewsService: SearchNewsService) {}

  @Get()
  findMany(@Query() searchQuery: QueryFiltersDto) {
    return this.searchNewsService.findMany(searchQuery);
  }
}
