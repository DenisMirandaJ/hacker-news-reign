import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoadNewsService } from './load-news.service';
import { HackerNews } from '../../db/news.entity';
import { NewsLoadTimes } from '../../db/options.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import BussinessExceptions from '../../exceptions/customExceptions';
import { throwsSpecificException } from '../../../test/test.utils';
require('dotenv').config({ path: '.env.test' });

describe('LoadNewsService', () => {
  let loadNewsService: LoadNewsService;
  let newsLoadTimesRepository: Repository<NewsLoadTimes>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LoadNewsService,
        {
          provide: getRepositoryToken(HackerNews),
          useValue: {
            insert: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(NewsLoadTimes),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    loadNewsService = moduleRef.get<LoadNewsService>(LoadNewsService);
    newsLoadTimesRepository = moduleRef.get<Repository<NewsLoadTimes>>(
      getRepositoryToken(NewsLoadTimes),
    );
  });

  describe('getLastRetrievalDate', () => {
    it('should be defined', () => {
      expect(loadNewsService.getLastRetrievalDate).toBeDefined();
    });

    it('newsLoadRepository should be defined', () => {
      expect(newsLoadTimesRepository).toBeDefined();
    });

    it('return Date of the last time the hacker news API was loaded', async () => {
      jest
        .spyOn(newsLoadTimesRepository, 'find')
        .mockReturnValueOnce(
          new Promise((resolve) => resolve([{ id: 1, timeStamp: new Date() }])),
        );
      const lastLoadDate = await loadNewsService.getLastRetrievalDate();
      const isValidDate =
        lastLoadDate instanceof Date && !isNaN(lastLoadDate?.getTime());
      expect(isValidDate).toBeTruthy();
    });

    it('return null if no records of last load date exist on DB', async () => {
      jest
        .spyOn(newsLoadTimesRepository, 'find')
        .mockReturnValueOnce(new Promise((resolve) => resolve([])));
      const lastLoadDate = await loadNewsService.getLastRetrievalDate();
      expect(lastLoadDate).toBeNull();
    });
  });

  describe('requestHackerNews', () => {
    it('should be defined', () => {
      expect(loadNewsService.requestHackerNews).toBeDefined();
    });

    it('should return Hacker new query data if request succesfull', () => {
      jest
        .spyOn(axios, 'get')
        .mockReturnValueOnce(
          new Promise((resolve) => resolve({ data: {}, status: 200 })),
        );

      expect(loadNewsService.requestHackerNews()).toBeInstanceOf(Object);
    });

    it('should throw ResourceUnavaliableException if request Fails', async () => {
      jest.spyOn(axios, 'get').mockImplementationOnce(() => {
        throw new Error();
      });

      const throwsResourceUnavaliableException = await throwsSpecificException(
        loadNewsService.requestHackerNews,
        BussinessExceptions.ResourceUnavaliableException,
      );
      expect(throwsResourceUnavaliableException).toBe(true);
    });
  });
});
