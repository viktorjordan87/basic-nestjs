import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Session } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import type { FastifyRequest } from 'fastify';
import * as secureSession from '@fastify/secure-session'

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) { }

  @Post()
  create(@Body() createSessionDto: CreateSessionDto, @Req() request: FastifyRequest) {
    return this.sessionsService.create(createSessionDto, request.session);
  }

  @Get()
  findAll(@Req() request: FastifyRequest) {
    return this.sessionsService.findAll(request.session);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Session() session: secureSession.Session) {
    return this.sessionsService.findOne(+id, session);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(+id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
