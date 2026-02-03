import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

/**
 * Pipe to validate the size of a file
 * @param maxSize - The maximum size of the file in MB
 * @returns The file
 */
export class FileSizeValidationPipe implements PipeTransform {

    constructor(private maxSize: number) {
        this.maxSize = maxSize;
    }

    transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
        const oneKb = 1024;
        const oneMb = oneKb * 1024;

        const { metatype, data } = metadata;

        if (typeof this.maxSize !== 'number') {
            throw new BadRequestException('File size must be a number');
        }

        const fileSize = value.size;

        //user provide the data in kb, we need to convert it to bytes
        const maxSize = this.maxSize * oneMb;

        if (fileSize > maxSize) {
            throw new BadRequestException(`File size ${(fileSize / oneMb).toFixed(2)} MB exceeds the maximum allowed size of ${this.maxSize} MB`);
        }

        return value;
    }

}