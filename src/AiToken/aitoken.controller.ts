import { Controller, Post, Body } from '@nestjs/common';
import { AiTokenService } from './aitoken.service';

@Controller('aitoken')
export class AiTokenController {
  constructor(private readonly aiTokenService: AiTokenService) {}
  @Post()
  getTextToken(@Body() body: { text: string }): string[] {
    return this.aiTokenService.getTextToken(body.text);
  }
}
