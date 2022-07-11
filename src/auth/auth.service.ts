import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { Users } from '../db/users.entity';
import * as jsonwebtoken from 'jsonwebtoken';
import BussinessExceptions from '../exceptions/customExceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  public async login(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new BussinessExceptions.NotFoundException();
    }
    const doesPasswordsMatch = await argon2.verify(user.password, password);
    if (doesPasswordsMatch) {
      const jwt = jsonwebtoken.sign(
        {
          userId: user.id,
          userEmail: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '365 days',
        },
      );

      return {
        token: jwt,
      };
    } else {
      throw new BussinessExceptions.InvalidCredentialsException();
    }
  }

  /**
   * Checks JWT and returns false, true or "expired" accordingly1
   *
   * @param jwt - json web token
   * @returns {boolean | "expired"}
   */
  public checkJwt(jwt: string): boolean | 'expired' {
    if (!jwt) {
      return false;
    }

    jwt = jwt?.replace('Bearer ', '');
    jwt = jwt?.replace('bearer ', '');

    try {
      jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      if (error instanceof jsonwebtoken.TokenExpiredError) {
        return 'expired';
      }

      return false;
    }
  }
}
