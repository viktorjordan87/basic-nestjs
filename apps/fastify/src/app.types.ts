/* Global types for the application */
import type { Role } from './auth/auth.roles';

declare module 'fastify' {
    interface FastifyRequest {
        user?: {
            sub: string;
            username: string;
            roles: Role[];
        };
    }
}