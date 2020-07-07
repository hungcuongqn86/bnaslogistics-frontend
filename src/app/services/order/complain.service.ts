import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {LoadingService} from '../../loading.service';
import {Complain} from '../../models/Complain';

@Injectable()
export class ComplainService {
    static instance: ComplainService;
    private handleError: HandleError;
    private moduleUri = 'complain/';
    public search = {key: '', status: '', limit: 20, page: 1};
    public complain: Complain;

    constructor(private loadingService: LoadingService,
                private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('OrderService');
        if (!this.complain) {
            this.reset();
        }
        return ComplainService.instance = ComplainService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    reset() {
        this.complain = {
            id: null,
            user_id: null,
            is_deleted: 0,
            created_at: '',
            updated_at: '',
            content: null,
            type: null,
            money_request: null,
            status: null,
            order_id: null,
            order: null,
            complain_products: null,
            otype: null
        };
    }

    getComplains(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            params = params.append(key, this.search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getComplain', []))
            );
    }

    getComplain(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getComplain', []))
            );
    }

    getComplainTypes(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}types`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getComplainTypes', []))
            );
    }

    public editComplain(data: Complain): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
        return this.http.post<any>(url, data)
            .pipe(
                catchError(this.handleError('editComplain', data))
            );
    }
}
