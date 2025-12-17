import { Controller, Get, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './user/login.guard';
import { PermissionGuard } from './user/permission.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @UseGuards(LoginGuard, PermissionGuard)
  @SetMetadata('permission', 'query_aaa')
  getHello(@Req() req): string {
    return 'Hello World!';
  }
}
