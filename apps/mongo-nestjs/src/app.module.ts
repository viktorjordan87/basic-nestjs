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
import { ShutdownService } from './shutdown/shutdown.service';
import { CustomersModule } from './modules/customers/customers.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CachesModule } from './modules/caches/caches.module';
import { MongoDBConnectionProvider } from './providers/mongodb-connection.provider';
import { setupRedisStore } from './utils/redis-setup';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisStore = await setupRedisStore(configService);

        return {
          stores: [redisStore],
        };
      },
    }),
    ConfigModule.forRoot(getEnvironmentConfig('mongo-nestjs')),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = await getMongooseConfig(configService);
        return config;
      },
    }),
    SalesModule,
    UsersModule,
    ProductsModule,
    CustomersModule,
    CachesModule,
  ],
  controllers: [AppController],
  providers: [AppService, MongoDBConnectionProvider, ShutdownService],
})
export class AppModule {}
