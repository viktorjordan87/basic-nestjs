import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

/**
 * Async provider that waits for MongoDB connection to be established.
 * This ensures the application doesn't accept requests until the database is ready.
 * Uses Mongoose's built-in connection.asPromise() method for reliable connection waiting.
 */
export const MongoDBConnectionProvider = {
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
