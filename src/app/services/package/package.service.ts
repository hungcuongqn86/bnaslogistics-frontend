import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {LoadingService} from '../../loading.service';
import {IPackage} from '../../models/interface';

@Injectable()
export class PackageService {
  static instance: PackageService;
  private handleError: HandleError;
  private moduleUri = 'order/package/';
  public search = {key: '', code: '', package_code: '', status: '', limit: 20, page: 1};

  constructor(private loadingService: LoadingService,
              private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('OrderService');
    return PackageService.instance = PackageService.instance || this;
  }

  public showLoading(value: boolean) {
    this.loadingService.setLoading(value);
  }

  public getPackages(): Observable<any> {
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

  public packageSearch(key: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}search1`;
    let params = new HttpParams();
    params = params.append('key', key);
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('packageSearch', []))
      );
  }

  public getPkStatus(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}status`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getPkStatus', []))
      );
  }

  public getPackage(id: number): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getPackage', []))
      );
  }

  public getPackageByCode(code: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}bycode/${code}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getPackageByCode', []))
      );
  }

  public editPackage(item: IPackage, dirty: string) {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}update/${item.id}`;
    return this.http.post<any>(url, {dirty: dirty, value: item[dirty]})
      .pipe(
        catchError(this.handleError('editPackage', item))
      );
  }
}
