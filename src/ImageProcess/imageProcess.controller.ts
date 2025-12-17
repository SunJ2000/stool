import {
  Controller,
  Post,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
} from '@nestjs/common';
import { ImageProcessService } from './imageProcess.serveice';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageProcessController {
  constructor(private readonly ImageProcessService: ImageProcessService) {}
  @Post('grayscale')
  @UseInterceptors(FileInterceptor('image'))
  async convertToGrayscaleBuffer(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<StreamableFile> {
    if (!file) {
      throw new BadRequestException('请上传图片文件');
    }
    return await this.ImageProcessService.convertToGrayscaleBuffer(file);
  }
}
