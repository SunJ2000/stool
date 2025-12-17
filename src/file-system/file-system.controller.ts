import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Query,
  Session,
} from '@nestjs/common';
import { FileSystemService } from './file-system.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller('file-system')
export class FileSystemController {
  constructor(private readonly fileSystemService: FileSystemService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFiles(@UploadedFile() file: Express.Multer.File, @Body() body) {
    const fileName = body.name;
    const chunkDir = 'uploads/chunks_' + fileName;
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }
    fs.cpSync(file.path, chunkDir + '/' + body.name);
    fs.rmSync(file.path);
    return fileName;
  }

  @Get('merge')
  merge(@Query('name') name: string) {
    const chunkDir = 'uploads/chunks_' + name;

    const files = fs.readdirSync(chunkDir);

    let count = 0;
    let startPos = 0;
    files.map((file) => {
      const filePath = chunkDir + '/' + file;
      const stream = fs.createReadStream(filePath);
      stream
        .pipe(
          fs.createWriteStream('uploads/' + name, {
            start: startPos,
          }),
        )
        .on('finish', () => {
          count++;

          if (count === files.length) {
            fs.rm(
              chunkDir,
              {
                recursive: true,
              },
              () => {},
            );
          }
        });

      startPos += fs.statSync(filePath).size;
    });
  }
}
