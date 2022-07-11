import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'typeorm';
jest.useFakeTimers();
jest.setTimeout(30000);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll((done) => {
    done();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/search (GET) to fail with 401 code (No auth token provided)', () => {
    return request(app.getHttpServer()).get('/search').expect(401);
  });
});
