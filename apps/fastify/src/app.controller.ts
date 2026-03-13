import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { Public } from './decorators';
import { ROLE } from './auth/auth.roles';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  // @Public()
  @Roles(ROLE.USER)
  @UseGuards(RolesGuard)
  getHello(): { json: string } {
    return this.appService.getHello();
  }

  @Get('get-cookie')
  getCookie(@Req() request: FastifyRequest, @Res({ passthrough: true }) response: FastifyReply) {
    return this.appService.getCookie(request, response);
  }
}
