import { ConfigService } from '@nestjs/config';
import KeyvRedis from '@keyv/redis';
import { Logger } from '@nestjs/common';

/**
 * Sets up the Redis store for the cache module and tests the connection.
 * @param configService - The config service.
 * @returns The Redis store.
 */
export async function setupRedisStore(
  configService: ConfigService,
): Promise<KeyvRedis<string>> {
  const logger = new Logger('Redis');

  if (
    !configService.get<string>('REDIS_USERNAME') ||
    !configService.get<string>('REDIS_PASSWORD') ||
    !configService.get<string>('REDIS_HOST') ||
    !configService.get<number>('REDIS_PORT')
  ) {
    throw new Error(
      'REDIS_USERNAME, REDIS_PASSWORD, REDIS_HOST and REDIS_PORT must be set',
    );
  }

  const redisHost = configService.get<string>('REDIS_HOST');
  const redisPort = configService.get<number>('REDIS_PORT');
  const redisUsername = configService.get<string>('REDIS_USERNAME');
  const redisPassword = configService.get<string>('REDIS_PASSWORD');

  logger.log(`🔌 Connecting to Redis at ${redisHost}:${redisPort}...`);

  // Build Redis URL with username and password
  const redisUrl = `redis://${redisUsername}:${redisPassword}@${redisHost}:${redisPort}`;

  const redisStore = new KeyvRedis({
    url: redisUrl,
  });

  // Add error handling
  redisStore.on('error', (err: unknown) => {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.error(`❌ Redis connection error: ${errorMessage}`);
  });

  // Test Redis connection with ping/pong
  const testKey = 'redis:connection:test';
  const testValue = 'pong';

  try {
    await redisStore.set(testKey, testValue);
    const result = await redisStore.get<string>(testKey);

    if (result === testValue) {
      logger.log('✅ Redis connection established - PING/PONG successful');
    } else {
      logger.warn('⚠️ Redis connection test failed - unexpected value');
    }

    await redisStore.delete(testKey);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`❌ Redis connection failed: ${errorMessage}`);
    throw error;
  }

  return redisStore;
}
