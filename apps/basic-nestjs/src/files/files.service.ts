import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import type { Express } from 'express';

@Injectable()
export class FilesService {
  create(createFileDto: CreateFileDto, file: Express.Multer.File) {
    console.log(file);
    return 'This action adds a new file';
  }

  uploadFile(file: Express.Multer.File) {
    console.log(file);
    return 'This action uploads a file';
  }

  uploadFiles(files: Express.Multer.File[]) {
    console.log(files);
    return 'This action uploads multiple files';
  }

  uploadMultipleFiles(files: Express.Multer.File[]) {
    console.log(files);
    return 'This action uploads multiple files';
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
