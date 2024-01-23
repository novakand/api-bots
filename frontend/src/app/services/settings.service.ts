import { Injectable } from '@angular/core';
import { IEnvironment } from '../.././environments/environment.interface';

@Injectable()
export class SettingsService {

    public environment: IEnvironment;
    public setEnvironment(env: IEnvironment) {
        this.environment = env;
    }

}
