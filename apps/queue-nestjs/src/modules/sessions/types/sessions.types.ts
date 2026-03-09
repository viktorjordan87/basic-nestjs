import type { FastifyRequest } from 'fastify';
import type { CreateSessionDto } from '../dto/create-session.dto';

declare module '@fastify/secure-session' {
    interface SessionData {
        sessionData: CreateSessionDto;
    }
}

export type FastifySession = FastifyRequest['session'];