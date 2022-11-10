import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../http-error-handler.service';
import {Util} from '../helper/lib';
import {apiV1Url} from '../const';
import {Router} from '@angular/router';
import {LoadingService} from '../loading.service';

@Injectable()
export class BankSmsService {
  static instance: BankSmsService;
  private handleError: HandleError;
  private moduleUri = 'banksms/';

  constructor(private router: Router, private loadingService: LoadingService,
              private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('BankSmsService');
    return BankSmsService.instance = BankSmsService.instance || this;
  }

  showLoading(value: boolean) {
    this.loadingService.setLoading(value);
  }

  getBankSmss(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getBankSmss', []))
      );
  }
}
