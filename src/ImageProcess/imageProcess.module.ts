import { Module } from '@nestjs/common';
import { ImageProcessService } from './imageProcess.serveice';
import { ImageProcessController } from './imageProcess.controller';

@Module({
  controllers: [ImageProcessController],
  providers: [ImageProcessService],
})
export class ImageProcessModule {}
