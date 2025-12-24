import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseConfig } from './db/config/config.mongoose';
import { SalesModule } from './modules/sales';
import { UsersModule } from './modules/users';
import { ProductsModule } from './modules/products';

@Module({
  imports: [
    ConfigModule.forRoot(getEnvironmentConfig('mongo-nestjs')),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getMongooseConfig(configService),
    }),
    SalesModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
