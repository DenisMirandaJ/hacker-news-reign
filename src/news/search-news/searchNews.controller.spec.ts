import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SearchNewsController } from './searchNews.controller';
import { SearchNewsService } from './searchNews.service';
import { HackerNews } from '../../db/news.entity';
import { QueryFiltersDto } from './dto/searchFilters.dto';
import { plainToInstance } from 'class-transformer';
require('dotenv').config({ path: '.env.test' });

describe('SearchNewsController', () => {
  let searchNewsController: SearchNewsController;
  let searchNewsService: SearchNewsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SearchNewsController],
      providers: [
        SearchNewsService,
        {
          provide: getRepositoryToken(HackerNews),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    searchNewsService = moduleRef.get<SearchNewsService>(SearchNewsService);
    searchNewsController =
      moduleRef.get<SearchNewsController>(SearchNewsController);
  });

  describe('findMany', () => {
    it('should be defined', () => {
      expect(searchNewsController.findMany).toBeDefined();
    });
  });

  it('should transfor QueryFiltersDto', async () => {
    const raw = {
      author: 'a',
      tags: 'a,b,c',
      min_date: 0,
      max_date: Math.floor(new Date().getTime() / 1000),
    };
    const transformedDto = plainToInstance(QueryFiltersDto, raw);
    expect(Array.isArray(transformedDto.tags)).toBe(true);
    expect(typeof transformedDto.min_date).toBe('number');
    expect(typeof transformedDto.max_date).toBe('number');
    expect(transformedDto.page).toBeGreaterThan(0);
  });
});
