import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS } from '../../events';
import { CreateCatDto } from '../../cats/dto/create-cat.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DogsEventListener {
  @OnEvent(EVENTS.CAT_CREATED)
  handleCatCreatedEvent(payload: CreateCatDto) {
    console.log('Cat created event received:', payload);
  }
}
