/* https://api.docs.bullmq.io/interfaces/v4.WorkerListener.html */

export const WORKER_EVENTS = {
    'ACTIVE': 'active',
    'CLOSED': 'closing',
    'COMPLETED': 'completed',
    'DRAINED': 'drained',
    'ERROR': 'error',
    'FAILED': 'failed',
    'IOREDIS:CLOSE': 'ioRedis:close',
    'PAUSED': 'paused',
    'PROGRESS': 'progress',
    'READY': 'ready',
    'RESUMED': 'resumed',
    'STALLED': 'stalled',
} as const;

export type WorkerEvents = keyof typeof WORKER_EVENTS;

/* https://api.docs.bullmq.io/interfaces/v4.QueueEventsListener.html */

export const QUEUE_EVENTS = {
    'ACTIVE': 'active',
    'ADDED': 'added',
    'CLEANED': 'cleaned',
    'COMPLETED': 'completed',
    'DELAYED': 'delayed',
    'DRAINED': 'drained',
    'DUPLICATED': 'duplicated',
    'ERROR': 'error',
    'FAILED': 'failed',
    'IOREDIS:CLOSE': 'ioRedis:close',
    'PAUSED': 'paused',
    'PROGRESS': 'progress',
    'REMOVED': 'removed',
    'RESUMED': 'resumed',
    'RETRIES_EXHAUSTED': 'retries-exhausted',
    'STALLED': 'stalled',
    'WAITING': 'waiting',
    'WAITING_CHILDREN': 'waiting-children',
} as const;

export type QueueEvents = keyof typeof QUEUE_EVENTS;