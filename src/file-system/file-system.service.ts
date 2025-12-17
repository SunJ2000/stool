import { Injectable } from '@nestjs/common';

@Injectable()
export class FileSystemService {
  create(createFileSystemDto) {
    return 'This action adds a new fileSystem';
  }
}
