import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { UploadedFileBase } from "../../../files/upload-file.types";

/**
 * Pipe to validate the size of a file
 * @param maxSize - The maximum size of the file in MB
 * @returns The file
 */
export class FileSizeValidation implements PipeTransform {

    constructor(private maxSize: number) {
        this.maxSize = maxSize;
    }

    transform(file: UploadedFileBase, metadata: ArgumentMetadata) {
        const oneKb = 1024;
        const oneMb = oneKb * 1024;

        const fileSize = file.size;

        //user provide the data in kb, we need to convert it to mb
        const maxSize = this.maxSize * oneMb;

        if (fileSize > maxSize) {
            throw new BadRequestException(`File size ${(fileSize / oneMb).toFixed(2)} MB exceeds the maximum allowed size of ${this.maxSize} MB`);
        }

        return file;
    }

}

/**
 * @description
 * Pipe to validate the size of multiple files
 * @param maxSize - The maximum size of the files in MB
 * @returns The files
 */
export class FilesSizeValidation implements PipeTransform {

    constructor(private maxSize: number) {
        this.maxSize = maxSize;
    }

    transform(files: UploadedFileBase[], metadata: ArgumentMetadata) {

        if (files.length < 2) {
            throw new BadRequestException('Please upload at least two files');
        }

        const oneKb = 1024;
        const oneMb = oneKb * 1024;

        files.forEach(file => {

            const fileSize = file.size;

            //user provide the data in kb, we need to convert it to mb
            const maxSize = this.maxSize * oneMb;

            if (fileSize > maxSize) {
                throw new BadRequestException(`File: ${file.originalname} - size: ${(fileSize / oneMb).toFixed(2)} MB exceeds the maximum allowed size of ${this.maxSize} MB`);
            }

        });

        return files;
    }

}


/**
 * @description
 * Pipe to validate the type of a file
 * @param allowedTypes - The allowed types of the file
 * @returns The file
 */
export class FileTypeValidation implements PipeTransform {

    constructor(private allowedTypes: string[]) {
        this.allowedTypes = allowedTypes;
    }

    transform(file: UploadedFileBase, metadata: ArgumentMetadata) {
        const allowedTypes = this.allowedTypes;

        if (allowedTypes.length === 0) {
            throw new BadRequestException('No allowed types provided');
        }

        if (!allowedTypes.includes(file.mimetype)) {
            throw new BadRequestException(`File type ${file.mimetype} is not allowed`);
        }

        return file;
    }
}

/**
 * @description
 * Pipe to validate the type of multiple files
 * @param allowedTypes - The allowed types of the files
 * @returns The files
 */
export class FilesTypeValidation implements PipeTransform {

    constructor(private allowedTypes: string[]) {
        this.allowedTypes = allowedTypes;
    }

    transform(files: UploadedFileBase[], metadata: ArgumentMetadata) {
        const allowedTypes = this.allowedTypes;

        if (allowedTypes.length === 0) {
            throw new BadRequestException('No allowed types provided');
        }

        files.forEach(file => {
            if (!allowedTypes.includes(file.mimetype)) {
                throw new BadRequestException(`File: ${file.originalname} - type: ${file.mimetype} is not allowed`);
            }
        });

        return files;
    }
}   