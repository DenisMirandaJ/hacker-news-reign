import { Test, TestingModule } from '@nestjs/testing';
import { LoadNewsService } from './load-news.service';

describe('LoadNewsService', () => {
  let service: LoadNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadNewsService],
    }).compile();

    service = module.get<LoadNewsService>(LoadNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
