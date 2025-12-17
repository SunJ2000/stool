import { Get, Injectable, UseGuards } from '@nestjs/common';
import { LoginGuard } from './user/login.guard';

@Injectable()
export class AppService {}
