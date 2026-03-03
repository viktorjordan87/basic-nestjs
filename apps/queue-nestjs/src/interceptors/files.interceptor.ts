import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    Type,
    mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import type { FastifyRequest } from 'fastify';
import type { MultipartFile } from '@fastify/multipart';
import type { FastifyFile } from '../modules/files/files.types';

async function multipartToFastifyFile(
    part: MultipartFile,
): Promise<FastifyFile> {
    const buffer = await part.toBuffer();
    return {
        fieldname: part.fieldname,
        originalname: part.filename,
        mimetype: part.mimetype,
        size: buffer.length,
        buffer,
    };
}

export function FastifyFileInterceptor(
    fieldName: string,
): Type<NestInterceptor> {
    class MixinInterceptor implements NestInterceptor {
        async intercept(
            context: ExecutionContext,
            next: CallHandler,
        ): Promise<Observable<any>> {
            const request = context
                .switchToHttp()
                .getRequest<FastifyRequest>();

            const part = await request.file();

            if (!part || part.type !== 'file' || part.fieldname !== fieldName) {
                throw new BadRequestException(
                    `Expected a file in field "${fieldName}"`,
                );
            }

            const file = await multipartToFastifyFile(part);
            (request as any).storageFile = file;

            return next.handle();
        }
    }

    return mixin(MixinInterceptor);
}

export function FastifyFilesInterceptor(
    fieldName: string,
    maxCount?: number,
): Type<NestInterceptor> {
    class MixinInterceptor implements NestInterceptor {
        async intercept(
            context: ExecutionContext,
            next: CallHandler,
        ): Promise<Observable<any>> {
            const request = context
                .switchToHttp()
                .getRequest<FastifyRequest>();

            const parts = request.files();
            const files: FastifyFile[] = [];

            for await (const part of parts) {
                if (part.type !== 'file' || part.fieldname !== fieldName) {
                    part.file.resume();
                    continue;
                }

                if (maxCount && files.length >= maxCount) {
                    throw new BadRequestException(
                        `Too many files. Maximum allowed: ${maxCount}`,
                    );
                }

                files.push(await multipartToFastifyFile(part));
            }

            if (files.length === 0) {
                throw new BadRequestException(
                    `Expected at least one file in field "${fieldName}"`,
                );
            }

            (request as any).storageFiles = files;

            return next.handle();
        }
    }

    return mixin(MixinInterceptor);
}
