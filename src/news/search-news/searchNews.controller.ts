import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../../auth/auth.service';
import { QueryFiltersDto } from './dto/searchFilters.dto';
import { SearchNewsService } from './searchNews.service';
@ApiBearerAuth()
@Controller('search')
export class SearchNewsController {
  constructor(private searchNewsService: SearchNewsService) {}

  @Get()
  findMany(@Query() searchQuery: QueryFiltersDto) {
    return this.searchNewsService.findMany(searchQuery);
  }
}
