import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from "cron";
import { EventService } from "../../event/service/event.service";

@Injectable()
export class CronService implements OnModuleInit, OnApplicationShutdown {

    constructor(
        private readonly eventService: EventService,
        private readonly schedulerRegistry: SchedulerRegistry
    ) { }

    public onModuleInit(): void {
        const job = new CronJob('00 00 * * *', () => this.eventService.updateChat$.next(true), null, null, 'Europe/Moscow')
        this.schedulerRegistry.addCronJob('updateKeyBoard', job);
        job.start();
    }
    public onApplicationShutdown(signal?: string): void {
      
    }

}