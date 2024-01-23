import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosRequestConfig, AxiosHeaders } from 'axios';

@Injectable()
export class HttpClientService {

    constructor(private http: HttpService) { }

    public get<T>(url: string, options?: AxiosRequestConfig | null): Observable<any> {
        options = options || {};

        options.withCredentials = true;

        return this.http.get<T>(url, options);
    }


    public post<T>(url: string, body: any, options?: AxiosRequestConfig): Observable<any> {
        options = this._getDefaultOptions(options);

        return this.http.post<T>(url, JSON.stringify(body), options);
    }

    public put<T>(url: string, body: any, options?: AxiosRequestConfig): Observable<any> {
        options = this._getDefaultOptions(options);

        return this.http.put<T>(url, JSON.stringify(body), options);
    }

    public delete(url: string, options?: AxiosRequestConfig): Observable<any> {
        return this.http.delete(url, options);
    }

    private _getDefaultOptions(options?: AxiosRequestConfig): AxiosRequestConfig {
        options = options || {};
        options.headers = options.headers || new AxiosHeaders({ 'Content-Type': 'application/json' });
        options.withCredentials = false;
        return options;
    }
}
