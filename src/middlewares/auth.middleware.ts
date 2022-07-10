import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    const isJwtValid = this.authService.checkJwt(authToken);

    if (isJwtValid === 'expired') {
      throw new UnauthorizedException('Auth token has expired');
    }

    if (!isJwtValid) {
      throw new UnauthorizedException('Invalid auth token');
    }

    next();
  }
}
