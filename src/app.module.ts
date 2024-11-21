import { Module } from '@nestjs/common';
import { CharacterModule } from './character/character.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './db/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    HttpModule,
    DatabaseModule,
    CharacterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
