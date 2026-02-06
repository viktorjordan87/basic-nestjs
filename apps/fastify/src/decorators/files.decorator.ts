// import { createParamDecorator, ExecutionContext } from "@nestjs/common";
// import type { FastifyFile } from "../../../basic-nestjs/src/files/upload-file.types";
// import type { FastifyRequest } from "fastify";

// export const Files = createParamDecorator((_data: unknown, ctx: ExecutionContext): Promise<null> | Promise<Record<string, FastifyFile[]>> => {
//     const request = ctx.switchToHttp().getRequest() as FastifyRequest;
//     return request.files;
// });

