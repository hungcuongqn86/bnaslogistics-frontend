import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Util} from '../helper/lib';
import {apiV1Url} from '../const';
import {catchError} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';

@Injectable()
export class DashboardService {
  static instance: DashboardService;
  private handleError: HandleError;
  private moduleUri = 'dashboard/';

  constructor(public http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('OrderService');
    return DashboardService.instance = DashboardService.instance || this;
  }

  getNewLinkCount(dateNumber: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}newlinks?dn=${dateNumber}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getNewLinkCount', []))
      );
  }


  getNewOrderCount(dateNumber: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}neworders?dn=${dateNumber}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getNewOrderCount', []))
      );
  }


  getNewUserCount(dateNumber: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}newusers?dn=${dateNumber}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getNewUserCount', []))
      );
  }


  getNewComplainCount(dateNumber: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}newcomplains?dn=${dateNumber}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getNewComplainCount', []))
      );
  }

  getStatisticTaobao(dateNumber: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}statisticbytaobao?dn=${dateNumber}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getStatisticTaobao', []))
      );
  }

  getStatisticTmall(dateNumber: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}statisticbytmall?dn=${dateNumber}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getStatisticTmall', []))
      );
  }

  getStatistic1688(dateNumber: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}statisticby1688?dn=${dateNumber}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('statisticby1688', []))
      );
  }

  orderstatisticbyday(dateNumber: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}orderstatisticbyday?dn=${dateNumber}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('orderstatisticbyday', []))
      );
  }

  orderstatisticbystatus(dateNumber: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}orderstatisticbystatus?dn=${dateNumber}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('orderstatisticbystatus', []))
      );
  }

  googleTranslate(textSourc: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}translation?key=${textSourc}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('googleTranslate', []))
      );
  }
}
