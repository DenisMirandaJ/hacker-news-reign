import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import BussinessExceptions from '../exceptions/customExceptions';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Get a JWT Auth token' })
  @ApiResponse({ status: 201, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User Not Found.' })
  @Post('login')
  async login(@Body() credentials: CredentialsDto) {
    try {
      return await this.authService.login(
        credentials.email,
        credentials.password,
      );
    } catch (error) {
      if (error instanceof BussinessExceptions.NotFoundException) {
        throw new NotFoundException('User does not Exist');
      }
      if (error instanceof BussinessExceptions.InvalidCredentialsException) {
        throw new UnauthorizedException('Wrong email or password');
      }
    }
  }
}
