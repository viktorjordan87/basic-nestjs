/**
 * BullBoard Module - UI dashboard for monitoring BullMQ queues
 * 
 * Sets up BullBoard UI at /bull-board-ui and registers queues for display.
 * Must import BullmqModule first so queues are registered before UI initializes.
 */
import { Module } from '@nestjs/common';
import { BullBoardModule as BullBoardModuleNest } from '@bull-board/nestjs';
import { FastifyAdapter } from '@bull-board/fastify';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullmqModule } from './bullmq.module';
import { QUEUE_NAMES } from '../../queues/queue.names';

const bullBoardQueueRegistrations = Object.values(QUEUE_NAMES).map((queueName) =>
  BullBoardModuleNest.forFeature({
    name: queueName,
    adapter: BullMQAdapter as any,
  }),
);

@Module({
  imports: [
    BullmqModule,
    BullBoardModuleNest.forRoot({
      route: '/bull-board-ui',
      adapter: FastifyAdapter,
    }),
    ...bullBoardQueueRegistrations,
  ],
})
export class BullBoardModule {}
