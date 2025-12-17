import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AiTokenService } from './aitoken.service';
import { TiktokenModel } from 'tiktoken';

@Controller('aitoken')
export class AiTokenController {
  constructor(private readonly aiTokenService: AiTokenService) {}
  @Post()
  getTextToken(@Body() body: { text: string; model: TiktokenModel }) {
    if (!body || body === null) {
      throw new BadRequestException({ errorMsg: '请求体不能为空' });
    }

    if (!body.text || !body.model) {
      throw new BadRequestException({
        errorMsg: '缺少必要参数',
        details: 'text 和 model 字段都是必需的',
      });
    }
    return this.aiTokenService.getTextToken(body.text, body.model);
  }
}
