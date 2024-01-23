import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, of, tap } from "rxjs";
import { HttpClientService } from "src/app/services/http-client.service";
import { environment } from "src/environments/environment";
import { IFilterRequest } from "../interfaces/filter-request.interfaces";


@Injectable()
export class CatalogService {

    public query$ = new BehaviorSubject<any>(null);
    public takeFilter$ = new BehaviorSubject<any>(null);
    public pageState$ = new BehaviorSubject<any>(null);
    public formSubmit$ = new BehaviorSubject<any>(null);

    constructor(
        private _http: HttpClientService,
    ) {
    }

    public filterUpdateAsync2(filter: IFilterRequest): Observable<any> {
        return this._http.post<any>(`/api/taxon/filter`, filter)
            .pipe(
                catchError((error: HttpErrorResponse) => of(error)),
                tap((data) => this.query$.next({ ...data })),
            );
    }

    public autoComplete(filter: any): Observable<any> {
        const { query } = filter;
        return this._http.get<any>(`/api/taxon/autocomplete?query=${query}`, {})
            .pipe(
                catchError((error: HttpErrorResponse) => of(error)),
            );
    }

    public getCountriesFilds(): Observable<any> {
        return this._http.get<any>(`/api/taxon/countries`, {})
            .pipe(
                catchError((error: HttpErrorResponse) => of(error)),
            );
    }

}