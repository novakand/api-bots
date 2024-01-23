import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { translate } from "@vitalets/google-translate-api"
import { from, Observable } from "rxjs";

@Injectable()
export class TranslateService implements OnModuleInit, OnApplicationShutdown {

    public onModuleInit(): void { }

    public onApplicationShutdown(signal?: string): void {}

    public translate(text: string): Observable<any> {
        return from(translate(text, { to: 'ru' }))
    }
}