import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryFiltersDto } from './dto/searchFilters.dto';
import { SearchNewsService } from './searchNews.service';
@ApiTags('Search')
@ApiBearerAuth()
@Controller('search')
export class SearchNewsController {
  constructor(private searchNewsService: SearchNewsService) {}

  @Get()
  findMany(@Query() searchQuery: QueryFiltersDto) {
    return this.searchNewsService.findMany(searchQuery);
  }
}
