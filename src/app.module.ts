import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiTokenModule } from './AiToken/aitoken.module';
import { ImageProcessModule } from './ImageProcess/imageProcess.module';
import { FileSystemModule } from './file-system/file-system.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Permission } from './user/entities/permission.entity';
import { RedisModule } from './redis/redis.module';

const businessModules = [AiTokenModule, ImageProcessModule];

@Module({
  imports: [
    ...businessModules,
    FileSystemModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '106.14.136.223',
      port: 3306,
      username: 'admin',
      password: 'Sun3014137637#%',
      database: 'stool',
      logging: true,
      entities: [User, Permission],
      poolSize: 10,
      connectorPackage: 'mysql2',
      synchronize: true,
    }),
    UserModule,
    JwtModule.register({
      secret: 'sun',
      global: true,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
