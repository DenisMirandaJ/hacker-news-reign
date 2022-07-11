import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../db/users.entity';
import BussinessExceptions from '../exceptions/customExceptions';
import { throwsSpecificException } from '../../test/test.utils';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
require('dotenv').config({ path: '.env.test' });

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const existingEmail = 'example@reign.cl';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Users),
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

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should be defined', () => {
      expect(authController).toBeDefined();
    });

    it('should return valid auth token', async () => {
      const authToken = await authController.login({
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

    it('AuthService should fail on non existing user with NotFoundException', async () => {
      const throwsNotFoundException = await throwsSpecificException(
        () => authService.login('user@does-not-exist.com', 'password'),
        BussinessExceptions.NotFoundException,
      );
      expect(throwsNotFoundException).toBe(true);
    });

    it('AuthService should fail on wrong credentials with InvalidCredentialsException', async () => {
      const throwsNotFoundException = await throwsSpecificException(
        () => authService.login(existingEmail, 'invalid-password'),
        BussinessExceptions.InvalidCredentialsException,
      );
      expect(throwsNotFoundException).toBe(true);
    });

    it('AuthController should fail on non existing user with HTTPNotFoundException', async () => {
      const throwsNotFoundException = await throwsSpecificException(
        () =>
          authController.login({
            email: 'user@does-not-exist.com',
            password: 'password',
          }),
        NotFoundException,
      );
      expect(throwsNotFoundException).toBe(true);
    });

    it('AuthService should fail on wrong credentials with HttpUnauthorizedException', async () => {
      const throwsNotFoundException = await throwsSpecificException(
        () =>
          authController.login({
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
      expect(authService.checkJwt).toBeDefined();
    });

    const validJwtToken = jwt.sign({}, process.env.JWT_SECRET);
    const invalidToken = jwt.sign({}, 'invalid-secret');
    const expiredJwtToken = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: '-10s',
    });

    it('should accept valid jwt token', async () => {
      expect(authService.checkJwt(validJwtToken)).toBe(true);
    });

    it('should reject empty jwt token', async () => {
      expect(authService.checkJwt(undefined)).toBe(false);
    });

    it('should reject invalid jwt token', async () => {
      expect(authService.checkJwt(invalidToken)).toBe(false);
    });

    it('should reject expired jwt token', async () => {
      expect(authService.checkJwt(expiredJwtToken)).toBe('expired');
    });
  });
});
