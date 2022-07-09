import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoadNewsModule } from './load-news/load-news.module';
import configuration from './config/configuration';
import { NewsLoadTimes } from './db/options.entity';
import { HackerNews } from './db/news.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    //TODO: configure env variables in a nestjs way and type .env
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [NewsLoadTimes, HackerNews],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    LoadNewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
