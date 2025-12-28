import { DynamicModule, Module } from '@nestjs/common';
import { DynamicConfigService } from './dynamic-config.service';
import { ConfigOptions } from './dynmic-config.interface';
import { ConfigurableModuleClass } from './dynamic-config.module.definition';

@Module({})
export class DynamicConfigModule extends ConfigurableModuleClass {
  static register(options: ConfigOptions): DynamicModule {
    return {
      module: DynamicConfigModule,
      providers: [
        {
          provide: 'DYNAMIC_CONFIG_OPTIONS',
          useValue: options,
        },
        DynamicConfigService,
      ],
      exports: [DynamicConfigService],
    };
  }
}
