import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EventService } from './service/event.service';

@Module({
  imports: [],
  providers: [EventService],
  exports: [EventService]
})
export class EventModule { }
