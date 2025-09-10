import { Module } from '@nestjs/common';
import { AiTokenService } from './aitoken.service';
import { AiTokenController } from './aitoken.controller';

@Module({
  controllers: [AiTokenController],
  providers: [AiTokenService],
})
export class AiTokenModule {}
