import {
    BadRequestException,
    createParamDecorator,
    ExecutionContext,
    PipeTransform,
    Type,
} from '@nestjs/common';
import type { FastifyFile } from '../modules/files/files.types';

export const UploadedFile = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): FastifyFile => {
        const request = ctx.switchToHttp().getRequest();
        const file = request.storageFile as FastifyFile | undefined;

        if (!file) {
            throw new BadRequestException('File not found on request');
        }

        return file;
    },
);

export const UploadedFiles = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): FastifyFile[] => {
        const request = ctx.switchToHttp().getRequest();
        const files = request.storageFiles as FastifyFile[] | undefined;

        if (!files || files.length === 0) {
            throw new BadRequestException('Files not found on request');
        }

        return files;
    },
);
