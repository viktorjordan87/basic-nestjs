import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) { }

  getHello(): string {
    return `Hello World Jordan! ${this.configService.get('APP_NAME')}`;
  }

  getCookie(request: Request, response: Response) {
    response.cookie('test', 'test', { httpOnly: true, secure: true, maxAge: 1000 * 5 });
    const cookies = JSON.stringify(request.cookies);
    response.send(`test cookies ${cookies}`);
  }
}
