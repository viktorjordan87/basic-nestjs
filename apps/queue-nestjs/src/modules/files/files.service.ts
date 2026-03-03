import { Injectable } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { FastifyFile } from './files.types';

@Injectable()
export class FilesService {
  private readonly uploadDir = join(process.cwd(), 'uploads', 'queue');

  private async ensureUploadDir() {
    await mkdir(this.uploadDir, { recursive: true });
  }

  async uploadSingle(file: FastifyFile) {
    await this.ensureUploadDir();

    const filePath = join(this.uploadDir, file.originalname);
    await writeFile(filePath, file.buffer);

    return {
      message: 'File uploaded successfully',
      file: {
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      },
    };
  }

  async uploadMultiple(files: FastifyFile[]) {
    await this.ensureUploadDir();

    for (const file of files) {
      const filePath = join(this.uploadDir, file.originalname);
      await writeFile(filePath, file.buffer);
    }

    return {
      message: `${files.length} file(s) uploaded successfully`,
      files: files.map((f) => ({
        fieldname: f.fieldname,
        originalname: f.originalname,
        mimetype: f.mimetype,
        size: f.size,
      })),
    };
  }
}
