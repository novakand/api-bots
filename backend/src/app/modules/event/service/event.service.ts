import { Injectable } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class EventService {

    constructor() { }

    public orderChange$ = new BehaviorSubject<any>(null);
    public cookieChange$ = new BehaviorSubject<boolean>(null);
    public subscribeChange$ = new BehaviorSubject<any>(null);
    public productChange$ = new BehaviorSubject<any>(null);
    public downloadCount$ = new BehaviorSubject<any>(null);
    public finishDownloadCount$ = new BehaviorSubject<any>(null);
    public updateDownloadOrder$ = new BehaviorSubject<any>(null);
    public updateChat$ = new BehaviorSubject<any>(null);
    public antiSpamChange$ = new BehaviorSubject<any>(null);
    public configChange$ = new BehaviorSubject<any>(null);
    public jobChange$ = new BehaviorSubject<any>(null);


}