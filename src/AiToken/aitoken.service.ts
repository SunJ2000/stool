import { Injectable } from '@nestjs/common';
import { encoding_for_model } from 'tiktoken';

@Injectable()
export class AiTokenService {
  getTextToken(text: string): string[] {
    const encoding = encoding_for_model('gpt-3.5-turbo');
    const tokenIds = encoding.encode(text);
    const tokens: string[] = [];

    for (const tokenId of tokenIds) {
      const tokenBytes = encoding.decode_single_token_bytes(tokenId);
      tokens.push(new TextDecoder().decode(tokenBytes));
    }
    encoding.free();
    return tokens;
  }
}
