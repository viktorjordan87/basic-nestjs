import { ConfigModuleOptions } from '@nestjs/config';

/**
 * Creates environment configuration for NestJS ConfigModule
 * @param projectName - The name of the project/app (e.g., 'basic-nestjs', 'second-nestjs')
 * @returns ConfigModuleOptions with environment-specific file paths
 */
export function getEnvironmentConfig(projectName: string): ConfigModuleOptions {
  const nodeEnv = process.env.NODE_ENV || 'development';

  return {
    envFilePath: [
      `apps/${projectName}/.env.${nodeEnv}`,
      `apps/${projectName}/.env`,
      '.env',
    ],
    expandVariables: true,
    isGlobal: true,
    cache: true,
  };
}
