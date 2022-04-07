import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {LoadingService} from '../../loading.service';
import {ICarrier} from "../../models/interface";
import {Carrier} from "../../models/model";

@Injectable()
export class ShippingService {
  static instance: ShippingService;
  private handleError: HandleError;
  private moduleUri = 'carrier/';
  public search = {code: '', key: '', status: '', limit: 20, page: 1};
  public carrier: ICarrier;

  constructor(private loadingService: LoadingService,
              private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ShippingService');
    if (!this.carrier) {
      this.carrier = new Carrier();
    }
    return ShippingService.instance = ShippingService.instance || this;
  }

  showLoading(value: boolean) {
    this.loadingService.setLoading(value);
  }

  public getShippings(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
    let params = new HttpParams();
    Object.keys(this.search).map((key) => {
      params = params.append(key, this.search[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getShippings', []))
      );
  }

  public getMyShippings(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}myshipping`;
    let params = new HttpParams();
    Object.keys(this.search).map((key) => {
      params = params.append(key, this.search[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getMyShippings', []))
      );
  }

  public getShipping(id): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getShipping', []))
      );
  }

  public getStatus(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}status`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getStatus', []))
      );
  }

  public getCountByStatus(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}count`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getCountByStatus', []))
      );
  }

  public addShipping(data: ICarrier): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}create`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError('addShipping', data))
      );
  }

  public editShipping(data: ICarrier): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError('editShipping', data))
      );
  }

  public approveShipping(data: ICarrier): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}approve`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError('editShipping', data))
      );
  }
}
