import { Injectable, Logger } from '@nestjs/common';
import { Interval, Timeout } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { HackerNews } from '../../db/news.entity';
import { NewsLoadTimes } from '../../db/options.entity';
import BussinessExceptions from '../../exceptions/customExceptions';
import { apiRateLimiter } from '../../utils/utils';
import {
  HackerNewsResponse,
  Hit,
} from './interfaces/hackerNewsApiResponse.type';

@Injectable()
export class LoadNewsService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(NewsLoadTimes)
    private newsLoadTimesRepository: Repository<NewsLoadTimes>,
    @InjectRepository(HackerNews)
    private hackerNewsRepository: Repository<HackerNews>,
  ) {}

  /**
   * Read DB to get the last time the hacker news where retrieved from the API,
   * @returns {Date | null} Last date at which the hacker news where retrieved from the Api
   */
  async getLastRetrievalDate(): Promise<Date | null> {
    const lastLoadTime = await this.newsLoadTimesRepository.find({
      order: {
        timeStamp: 'DESC',
      },
      take: 1,
    });

    if (!lastLoadTime?.[0]) {
      return null;
    }

    return new Date(lastLoadTime?.[0].timeStamp);
  }

  /**
   * Query the Hacker news API, see https://hn.algolia.com/api/
   * @param page - desired page
   * @param minDate - retrieve only items where createdAt is bigger than minDate
   * @returns {Promise<HackerNewsResponse>}
   */
  async requestHackerNews(
    page = 0,
    minDate?: Date,
  ): Promise<HackerNewsResponse> {
    const numericFilters = minDate
      ? `created_at_i>${Math.floor(minDate.getTime() / 1000)}`
      : undefined;

    // Wrap the api call on a rate limiter of one request every 100ms, just to be good citizens
    const response = await apiRateLimiter.schedule(async () => {
      try {
        return axios.get<HackerNewsResponse>(
          'https://hn.algolia.com/api/v1/search_by_date',
          {
            params: {
              query: 'nodejs',
              page,
              numericFilters,
            },
          },
        );
      } catch (error) {
        throw new BussinessExceptions.ResourceUnavaliableException(
          'Could not fetch from Hacker News API',
        );
      }
    });

    return response.data;
  }

  /**
   * Store items from the HAcker news api in the DB
   * @param hits - items of the hacker news APi to store on the DB
   */
  async storeHackerNews(hits: Hit[]) {
    await this.hackerNewsRepository.insert(hits);
  }

  /**
   * Load news from API and store them in the database, runs every 1 hour
   */
  //TODO change interval before submitting
  @Interval(60 * 1000)
  async loadNews() {
    const lastRetrievalDate = await this.getLastRetrievalDate();
    // if less than an hour has passed since the last retrieval, do nothing
    if (
      lastRetrievalDate !== null &&
      Date.now() - lastRetrievalDate.getTime() < 60 * 1000
    ) {
      return;
    }

    const retrievalDate = new Date();

    let page = 0;
    let numberOfPages: number;
    let newsLoaded = 0;
    while (!numberOfPages || page < numberOfPages) {
      try {
        const hackerNews = await this.requestHackerNews(
          page,
          lastRetrievalDate,
        );
        if (!numberOfPages) {
          numberOfPages = hackerNews.nbPages;
        }
        await this.storeHackerNews(hackerNews.hits);
        newsLoaded += hackerNews.hits.length;
        page += 1;
      } catch (error) {
        this.logger.log(
          `Could not fetch from Hacker News API`,
          'Hacker News API',
        );

        return;
      }
    }

    await this.newsLoadTimesRepository.insert({ timeStamp: retrievalDate });
    this.logger.log(
      `${newsLoaded} new items loaded into the DATABASE`,
      'Hacker News API',
    );
  }

  /**
   * Load news from de hacker news APi at the app startup
   */
  @Timeout(0)
  async loadNewsAtStartup() {
    this.loadNews();
  }
}
