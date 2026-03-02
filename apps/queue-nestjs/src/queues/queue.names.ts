/**
 * Queue Names Configuration
 * 
 * Centralized list of all BullMQ queue names. Add new queues here and they
 * will be automatically registered in BullmqModule and BullBoardModule.
 */
export const QUEUE_NAMES = {
    JOB_QUEUE: 'job-queue',
    IMAGE_QUEUE: 'image-queue',
} as const;

export type QueueNames = keyof typeof QUEUE_NAMES;