import { Injectable } from '@nestjs/common';
import { DynamicConfigService } from './config/dynamic-config.service';

@Injectable()
export class AppService {
  constructor(private readonly dynamicConfigService: DynamicConfigService) {}
  getHello(): string {
    const appName = this.dynamicConfigService.get('APP_NAME');
    return `Hello World from third nestjs! ${appName}`;
  }
}
