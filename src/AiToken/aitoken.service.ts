import { Injectable } from '@nestjs/common';
import { encoding_for_model, TiktokenModel } from 'tiktoken';

@Injectable()
export class AiTokenService {
  getTextToken(text: string, model: TiktokenModel = 'gpt-4') {
    const encoding = encoding_for_model(model);
    const tokenIds = encoding.encode(text);
    const tokens: string[] = [];

    for (const tokenId of tokenIds) {
      const tokenBytes = encoding.decode_single_token_bytes(tokenId);
      tokens.push(new TextDecoder().decode(tokenBytes));
    }

    encoding.free();
    return { tokens };
  }
}
