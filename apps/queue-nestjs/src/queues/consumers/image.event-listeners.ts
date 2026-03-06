import { OnQueueEvent, QueueEventsHost, QueueEventsListener, } from "@nestjs/bullmq";
import { QUEUE_NAMES } from "../queue.names";
import { QUEUE_EVENTS } from "../queue.events";
import { Job } from "bullmq";


@QueueEventsListener(QUEUE_NAMES.IMAGE_QUEUE)
export class ImageEventListeners extends QueueEventsHost {

    @OnQueueEvent(QUEUE_EVENTS.ACTIVE)
    async onActive(job: Job): Promise<void> {
        console.log('Processing job, event: active', job);
    }
}