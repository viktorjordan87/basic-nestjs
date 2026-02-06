import { Controller, Get, Post, Body, Patch, Param, Delete, Header, StreamableFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import type { FastifyFile } from '../../../basic-nestjs/src/files/upload-file.types';
import { createDispositionHeader } from '../utils/disposition.helper';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Post("upload-file")
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile(new FileSizeValidation(3), new FileTypeValidation(['image/jpeg', 'image/jpg', 'image/webp', 'image/png'])) file: Express.Multer.File) {
  //   return this.filesService.uploadFile(file);
  // }
  uploadFile(@Body() file: FastifyFile) {
    return this.filesService.uploadFile(file);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }

  @Get('download')
  @Header('Content-Disposition', createDispositionHeader('download', 'medellin.jpg'))
  downloadFile(): StreamableFile {
    // Resolve path relative to project root (tsconfig @uploads/* maps to uploads/*)
    const filePath = join(process.cwd(), "uploads", "medellin.jpg");
    const file = createReadStream(filePath);
    return new StreamableFile(file, {
      type: 'image/jpeg',
    })
  }

  @Get('download2')
  downloadFile2(): StreamableFile {
    // Resolve path relative to project root (tsconfig @uploads/* maps to uploads/*)
    const filePath = join(process.cwd(), "uploads", "medellin.jpg");
    const file = createReadStream(filePath);
    return new StreamableFile(file, {
      type: 'image/jpeg',
      disposition: createDispositionHeader('download', 'medellin.jpg'),
    })
  }
}
