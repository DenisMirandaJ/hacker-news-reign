import { Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import {
  ShowHiddenRecordsOptionsDto,
  VisibilityQueryFiltersDto,
} from '../search-news/dto/searchFilters.dto';
import { NewsVisibilityService } from './newsVisibility.service.ts';

@ApiTags('Visibility')
@ApiBearerAuth()
@Controller('visibility')
export class NewsVisibilityController {
  constructor(private newsVisibilityService: NewsVisibilityService) {}

  @ApiOperation({
    summary:
      'Hide the records matching the provided filters, they WILL NOT appear in subsequents calls to the /search endpoint',
  })
  @ApiResponse({ status: 201, description: 'OK' })
  @Post('hide')
  hideMany(@Query() searchQuery: VisibilityQueryFiltersDto) {
    return this.newsVisibilityService.changeVisibility(searchQuery, 'hide');
  }

  @ApiOperation({
    summary:
      'Show the records matching the provided filters, they WILL appear in subsequents calls to the /search endpoint',
  })
  @ApiResponse({ status: 201, description: 'OK' })
  @Post('show')
  showMany(@Query() searchQuery: VisibilityQueryFiltersDto) {
    return this.newsVisibilityService.changeVisibility(searchQuery, 'show');
  }

  @ApiOperation({
    summary: 'show a list of all the hidden records',
  })
  @ApiResponse({ status: 201, description: 'OK' })
  @Get('/hidden')
  showHiddenRecords(@Query() searchQuery: ShowHiddenRecordsOptionsDto) {
    return this.newsVisibilityService.getHiddenRecords(searchQuery);
  }
}
