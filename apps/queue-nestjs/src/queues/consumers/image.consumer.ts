import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { QUEUE_NAMES } from "../queue.names";
import { Job } from "bullmq";
import { ImageJobData } from "../queue.types";
import { join } from "path";
import sharp, { OutputInfo } from "sharp";
import { WORKER_EVENTS } from "../queue.events";


@Processor(QUEUE_NAMES.IMAGE_QUEUE)
export class ImageConsumer extends WorkerHost {

    private readonly uploadDir = join(process.cwd(), 'uploads', 'queue');
    private readonly fileExtension = '.webp'

    private removeExtension(filename: string) {
        return filename.split('.').slice(0, -1).join('.');
    }

    async process(job: Job<ImageJobData>): Promise<{ info: OutputInfo, newFilePath: string }> {
        const { filePath, originalname } = job.data;

        const newFilePath = join(this.uploadDir, `${this.removeExtension(originalname)}${this.fileExtension}`);

        const info = await sharp(filePath).webp({ quality: 100 }).toFile(newFilePath);

        return {
            info,
            newFilePath,
        };
    }

    @OnWorkerEvent(WORKER_EVENTS.COMPLETED)
    async onWorkerCompleted(job: Job): Promise<void> {
        console.log('Worker completed', job.id, job.name);
    }
}