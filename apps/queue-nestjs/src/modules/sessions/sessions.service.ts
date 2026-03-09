import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import type { FastifySession } from './types/sessions.types';
import * as secureSession from '@fastify/secure-session'

@Injectable()
export class SessionsService {
  create(createSessionDto: CreateSessionDto, session: FastifySession) {
    session.set('sessionData', createSessionDto);
    return 'This action adds a new session';
  }

  findAll(session: FastifySession) {
    return session.get('sessionData');
  }

  findOne(id: number, session: secureSession.Session) {
    console.log(session);
    console.log(id)
    const sessionData = session.get('sessionData');
    return `This action returns the session data ${JSON.stringify(sessionData)}`;
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
