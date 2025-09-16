import { Injectable, StreamableFile } from '@nestjs/common';

import sharp from 'sharp';

@Injectable()
export class ImageProcessService {
  // 可选：直接返回 Buffer（不保存文件）
  async convertToGrayscaleBuffer(file: Express.Multer.File) {
    const processedBuffer = await sharp(file.buffer).grayscale().toBuffer();

    return new StreamableFile(processedBuffer, {
      type: file.mimetype,
      disposition: `attachment; filename="grayscale-${file.originalname}"`,
    });
  }
}
