import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { FastifyRequest, FastifyReply } from 'fastify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): { json: string } {
    return this.appService.getHello();
  }

  @Get('get-cookie')
  getCookie(@Req() request: FastifyRequest, @Res({ passthrough: true }) response: FastifyReply) {
    return this.appService.getCookie(request, response);
  }
}
