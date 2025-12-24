import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './db/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(getEnvironmentConfig('typeorm-mysql')),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class TypeormMysqlModule {}
