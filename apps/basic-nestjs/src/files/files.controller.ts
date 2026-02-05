import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UploadedFiles } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { FileSizeValidation, FilesSizeValidation, FilesTypeValidation, FileTypeValidation } from '../pipes/validation';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createFileDto: CreateFileDto,
    @UploadedFile(new FileSizeValidation(3), new FileTypeValidation(['image/jpeg', 'image/jpg', 'image/webp', 'image/png'])) file: Express.Multer.File,
  ) {
    return this.filesService.create(createFileDto, file);
  }

  @Post('upload-multiple-files')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultipleFiles(
    @UploadedFiles(new FilesSizeValidation(3), new FilesTypeValidation(['image/jpeg', 'image/jpg', 'image/webp'])) files: Express.Multer.File[],
  ) {
    return this.filesService.uploadMultipleFiles(files);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          //this validator not working out of tbe box, write a custom one as i did in the file-size-validation pipe
          // new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }),
          //this validator is working out of the box, write a custom one
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      })
    ) file: Express.Multer.File,
  ) {
    return this.filesService.uploadFile(file);
  }

  @Post('upload-files')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          //write a custom validator for files
          //TODO
          // new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }),
        ],
      })
    ) files: Express.Multer.File[],
  ) {

    return this.filesService.uploadFiles(files);
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
}
