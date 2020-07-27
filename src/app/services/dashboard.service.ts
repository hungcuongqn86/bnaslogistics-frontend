import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Util} from "../helper/lib";
import {apiV1Url} from "../const";
import {catchError} from "rxjs/operators";
import {HandleError, HttpErrorHandler} from "../http-error-handler.service";

@Injectable()
export class DashboardService {
  static instance: DashboardService;
  private handleError: HandleError;
  private moduleUri = 'dashboard/';

  constructor(public http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('OrderService');
    return DashboardService.instance = DashboardService.instance || this;
  }

  getNewLinkCount(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}newlinks`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getNewLinkCount', []))
      );
  }


  getNewOrderCount(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}neworders`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getNewOrderCount', []))
      );
  }


  getNewUserCount(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}newusers`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getNewUserCount', []))
      );
  }


  getNewComplainCount(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}newcomplains`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getNewComplainCount', []))
      );
  }
}
