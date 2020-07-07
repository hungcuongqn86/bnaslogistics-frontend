import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiUrl, apiV1Url} from '../../const';
import {LoadingService} from '../../loading.service';
import {Package} from '../../models/Package';

@Injectable()
export class PackageService {
    static instance: PackageService;
    private handleError: HandleError;
    private moduleUri = 'order/package/';
    public search = {key: '', code: '', package_code: '', status: '', limit: 20, page: 1};
    public package: Package;

    constructor(private loadingService: LoadingService,
                private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('OrderService');
        return PackageService.instance = PackageService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    getPackages(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            if (this.search[key]) {
                params = params.append(key, this.search[key]);
            }
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getPackages', []))
            );
    }

    getPkStatus(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}status`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getPkStatus', []))
            );
    }


    public editPackage(item: Package) {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
        return this.http.post<any>(url, item)
            .pipe(
                catchError(this.handleError('editPackage', item))
            );
    }
}
