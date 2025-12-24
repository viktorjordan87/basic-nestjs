import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export const onConnectionCreate = (connection: Connection) => {
  connection.on('connected', () => console.log('Mongo connection connected'));
  connection.on('open', () =>
    console.log('Mongo connection ready for operations'),
  );
  connection.on('disconnected', () =>
    console.log('Mongo connection disconnected'),
  );
  connection.on('reconnected', () =>
    console.log('Mongo connection reconnected'),
  );
  connection.on('disconnecting', () =>
    console.log('Mongo connection disconnecting'),
  );

  return connection;
};
export const getMongooseConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  await ConfigModule.envVariablesLoaded;
  return {
    uri: configService.get<string>('MONGODB_URI')!,
    onConnectionCreate,
  };
};
