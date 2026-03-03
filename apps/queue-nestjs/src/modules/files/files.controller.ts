import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import {
    FastifyFileInterceptor,
    FastifyFilesInterceptor,
} from '../../interceptors';
import { UploadedFile, UploadedFiles } from '../../decorators';
import type { FastifyFile } from './files.types';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('single')
    @UseInterceptors(FastifyFileInterceptor('file'))
    async uploadSingle(@UploadedFile() file: FastifyFile) {
        return this.filesService.uploadSingle(file);
    }

    @Post('multiple')
    @UseInterceptors(FastifyFilesInterceptor('files'))
    async uploadMultiple(@UploadedFiles() files: FastifyFile[]) {
        return this.filesService.uploadMultiple(files);
    }
}
