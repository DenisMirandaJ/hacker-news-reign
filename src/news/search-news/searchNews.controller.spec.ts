import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import { getRepositoryToken } from '@nestjs/typeorm';

import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SearchNewsController } from './searchNews.controller';
import { SearchNewsService } from './searchNews.service';
import { HackerNews } from '../../db/news.entity';
require('dotenv').config({ path: '.env.test' });

describe('SearchNewsController', () => {
  let searchNewsController: SearchNewsController;
  let searchNewsService: SearchNewsService;

  const existingEmail = 'example@reign.cl';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SearchNewsController],
      providers: [
        SearchNewsService,
        {
          provide: getRepositoryToken(HackerNews),
          useValue: {
            findOneBy: jest.fn(({ email }) => {
              if (email === existingEmail) {
                return {
                  email: existingEmail,
                  password:
                    '$argon2i$v=19$m=16,t=2,p=1$WTZFazJTeVd3V0kyRlV3UA$9YaHviitHSen7QpS11P7jw',
                };
              }

              return null;
            }),
          },
        },
      ],
    }).compile();

    searchNewsService = moduleRef.get<SearchNewsService>(SearchNewsService);
    searchNewsController =
      moduleRef.get<SearchNewsController>(SearchNewsController);
  });

  describe('login', () => {
    it('should be defined', () => {
      expect(searchNewsController).toBeDefined();
    });

    it('should return valid auth token', async () => {
      const authToken = await searchNewsController.login({
        email: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
      });
      console.log(`jest: ${authToken}`);
      let tokenVerified = false;

      try {
        jwt.verify(authToken?.token, process.env.JWT_SECRET);
        tokenVerified = true;
      } catch (error) {
        tokenVerified = false;
      }
      expect(tokenVerified).toBe(true);
    });

    it('SearchNewsService should fail on non existing user with NotFoundException', async () => {
      const throwsNotFoundException = await throwsSpecificException(
        () => searchNewsService.login('user@does-not-exist.com', 'password'),
        BussinessExceptions.NotFoundException,
      );
      expect(throwsNotFoundException).toBe(true);
    });

    it('SearchNewsService should fail on wrong credentials with InvalidCredentialsException', async () => {
      const throwsNotFoundException = await throwsSpecificException(
        () => searchNewsService.login(existingEmail, 'invalid-password'),
        BussinessExceptions.InvalidCredentialsException,
      );
      expect(throwsNotFoundException).toBe(true);
    });

    it('SearchNewsController should fail on non existing user with HTTPNotFoundException', async () => {
      const throwsNotFoundException = await throwsSpecificException(
        () =>
          searchNewsController.login({
            email: 'user@does-not-exist.com',
            password: 'password',
          }),
        NotFoundException,
      );
      expect(throwsNotFoundException).toBe(true);
    });

    it('SearchNewsService should fail on wrong credentials with HttpUnauthorizedException', async () => {
      const throwsNotFoundException = await throwsSpecificException(
        () =>
          searchNewsController.login({
            email: existingEmail,
            password: 'invalid-password',
          }),
        UnauthorizedException,
      );
      expect(throwsNotFoundException).toBe(true);
    });
  });

  describe('check-jwt', () => {
    it('should be defined', () => {
      expect(searchNewsService.checkJwt).toBeDefined();
    });

    const validJwtToken = jwt.sign({}, process.env.JWT_SECRET);
    const invalidToken = jwt.sign({}, 'invalid-secret');
    const expiredJwtToken = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: '-10s',
    });

    it('should accept valid jwt token', async () => {
      expect(searchNewsService.checkJwt(validJwtToken)).toBe(true);
    });

    it('should reject empty jwt token', async () => {
      expect(searchNewsService.checkJwt(undefined)).toBe(false);
    });

    it('should reject invalid jwt token', async () => {
      expect(searchNewsService.checkJwt(invalidToken)).toBe(false);
    });

    it('should reject expired jwt token', async () => {
      expect(searchNewsService.checkJwt(expiredJwtToken)).toBe('expired');
    });
  });
});
