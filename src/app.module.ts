import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiTokenModule } from './AiToken/aitoken.module';

const businessModules = [AiTokenModule];

@Module({
  imports: [...businessModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
