import { Injectable } from '@nestjs/common';

@Injectable()
export class SecondNestjsService {
  getHello(): string {
    return 'Hello World from second nestjs!';
  }
}
