import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EventModule } from '../event/event.module';
import { CronService } from './service/cron.service';

@Module({
  imports: [ScheduleModule.forRoot(),EventModule],
  providers: [CronService],
  exports: [CronService]
})
export class CronModule { }
