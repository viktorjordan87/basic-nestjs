/**
 * BullMQ Module - Registers all BullMQ queues globally
 * 
 * Sets up Redis connection and registers all queues from QUEUE_NAMES.
 * Queues can be injected using: @InjectQueue(QUEUE_NAMES.QUEUE_NAME)
 */
import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QUEUE_NAMES } from '../../queues/queue.names';

const queueRegistrations = Object.values(QUEUE_NAMES).map((queueName) =>
  BullModule.registerQueue({
    name: queueName,
  }),
);

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const redisUrl = config.get<string>('REDIS_URL');
        const redisPort = config.get<number>('REDIS_PORT');
        const redisUser = config.get<string>('REDIS_USER');
        const redisPassword = config.get<string>('REDIS_PASSWORD');
        return {
          connection: {
            host: redisUrl!,
            port: Number(redisPort!),
            username: redisUser!,
            password: redisPassword!,
          },
        };
      },
      inject: [ConfigService],
    }),
    ...queueRegistrations,
  ],
  exports: [BullModule],
})
export class BullmqModule { }
