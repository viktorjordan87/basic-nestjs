import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ConfigOptions } from './dynmic-config.interface';

//provides default the register and registerAsync method
//If you use setClassMethodName('forRoot'), it generates forRoot() and forRootAsync() instead
//Without it, default is register() and registerAsync()
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ConfigOptions>()
    // .setClassMethodName('forRoot') // REMOVED: This would generate forRoot()/forRootAsync()
    // Without it, generates register()/registerAsync() by default
    .setExtras({ isGlobal: false }, (config, extras) => ({
      ...config,
      global: extras.isGlobal,
    }))
    .build();
