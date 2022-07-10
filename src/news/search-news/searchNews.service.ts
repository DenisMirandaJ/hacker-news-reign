import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HackerNews } from '../../db/news.entity';
import { getDateRangeByLastMonth } from '../../utils/date.utils';
import { QueryFiltersDto } from './dto/searchFilters.dto';

@Injectable()
export class SearchNewsService {
  constructor(
    @InjectRepository(HackerNews)
    private hackerNewsRepository: Repository<HackerNews>,
  ) {}

  /**
   * Search items based on author, min_date, max_date, month_name and tags
   *
   * Notes: if provided min_date and max_date override the month name
   *
   * @param filters {QueryFiltersDto} - Search Filters for the Hacker news API
   * @returns - HAckerNewsList
   */
  async findMany(filters: QueryFiltersDto) {
    let dateRange: { minDate: number; maxDate: number };

    if (filters.month_word) {
      const monthWordDateRange = getDateRangeByLastMonth(filters.month_word);
      dateRange = {
        minDate: monthWordDateRange.monthFirstDate.getTime() / 1000,
        maxDate: monthWordDateRange.monthLastDate.getTime() / 1000,
      };
    }

    // Filters.min_date and filters.max_date take precedence over filters.month_word
    if (filters.min_date || filters.max_date) {
      dateRange.minDate = filters?.min_date;
      dateRange.maxDate = filters?.max_date;
    }

    let query = this.hackerNewsRepository.createQueryBuilder('hacker_news');

    if (filters.author) {
      query = query.where('LOWER(hacker_news.author) = LOWER(:author)', {
        author: filters.author,
      });
    }

    query = query
      .andWhere('hacker_news.created_at_i >= :minDate', {
        minDate: dateRange?.minDate || 0,
      })
      .andWhere('hacker_news.created_at_i <= :maxDate', {
        maxDate: dateRange?.maxDate || Math.floor(new Date().getTime() / 1000),
      });

    if (filters.tags) {
      for (const tag of filters.tags) {
        query = query.andWhere(':tag ILIKE ANY(hacker_news._tags)', {
          tag,
        });
      }
    }

    query = query
      .skip((filters.page - 1) * filters.itemsPerPage)
      .take(filters.itemsPerPage);

    const result = await query.getMany();

    return result;
  }
}
