import type { Express } from 'express';

/**
 * Minimal file shape that validation pipes rely on.
 * Works for both Multer (Express) and Fastify-adapted files.
 */
export interface UploadedFileBase {
  size: number;
  mimetype: string;
  originalname: string;
}

/**
 * Adapter shape for files coming from Fastify multipart.
 * Controllers can map Fastify's multipart part into this interface.
 */
export interface FastifyFile extends UploadedFileBase {
  fieldname: string;
  filename: string;
}

/**
 * Union type for files accepted across the app.
 * - Express.Multer.File: from @nestjs/platform-express + Multer
 * - FastifyFile: from @fastify/multipart, adapted to UploadedFileBase
 */
export type AppUploadedFile = Express.Multer.File | FastifyFile;

export type AppUploadedFiles = AppUploadedFile[];

