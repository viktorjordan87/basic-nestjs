import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { getMongooseConfig } from './db/config/config.mongoose';
import { SalesModule } from './modules/sales';
import { UsersModule } from './modules/users';
import { ProductsModule } from './modules/products';
import { ShutdownService } from './shutdown/shutdown.service';
import { CustomersModule } from './modules/customers/customers.module';

/**
 * Async provider that waits for MongoDB connection to be established.
 * This ensures the application doesn't accept requests until the database is ready.
 * Uses Mongoose's built-in connection.asPromise() method for reliable connection waiting.
 */
const MongoDBConnectionProvider = {
  provide: 'MONGODB_CONNECTION_READY',
  useFactory: async (connection: Connection): Promise<Connection> => {
    // Wait for the connection to be ready using Mongoose's built-in promise
    await connection.asPromise();
    console.log(
      '✅ MongoDB connection established - Application ready to accept requests',
    );
    return connection;
  },
  inject: [getConnectionToken()],
};

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService, MongoDBConnectionProvider, ShutdownService],
})
export class AppModule {}
