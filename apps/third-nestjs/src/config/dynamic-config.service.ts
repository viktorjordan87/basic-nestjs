import { Injectable, Inject } from '@nestjs/common';
import type { ConfigOptions } from './dynmic-config.interface';
import { EnvConfig } from './dynmic-config.interface';
import { resolve } from 'path';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DynamicConfigService {
  private readonly envConfig: EnvConfig;

  constructor(
    @Inject('DYNAMIC_CONFIG_OPTIONS') private readonly options: ConfigOptions,
    private readonly configService: ConfigService,
  ) {
    if (!process.env.NODE_ENV) {
      throw new Error('NODE_ENV is not set');
    }
    const projectName = this.configService.get<string>('PROJECT_NAME');
    if (!projectName) {
      throw new Error(
        'PROJECT_NAME is not set in environment variables. Please add PROJECT_NAME="third-nestjs" to apps/third-nestjs/.env',
      );
    }
    const envFile = `.${process.env.NODE_ENV}.env`;
    const workspaceRoot = process.cwd();
    const filePath = resolve(
      workspaceRoot,
      'apps',
      projectName,
      this.options.folder,
      envFile,
    );
    this.envConfig = parse(readFileSync(filePath));
  }

  get(key: string): string | undefined {
    return this.envConfig[key];
  }
}
