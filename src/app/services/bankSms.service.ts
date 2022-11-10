import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../http-error-handler.service';
import {Util} from '../helper/lib';
import {apiV1Url} from '../const';
import {Router} from '@angular/router';
import {LoadingService} from '../loading.service';
import {User} from '../models/model';

export interface BankAccount {
  id: number;
  name: string;
  account_number: string;
  account_name: string;
  bin: string;
  sender: string;
  is_sms: string;
  sms_temp: string;
  status: number;
  bank_debt: number;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class BankAccountService {
  static instance: BankAccountService;
  private handleError: HandleError;
  private moduleUri = 'bankaccount/';
  public account: BankAccount;

  constructor(private router: Router, private loadingService: LoadingService,
              private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PartnerService');
    if (!this.account) {
      this.reset();
    }
    return BankAccountService.instance = BankAccountService.instance || this;
  }

  showLoading(value: boolean) {
    this.loadingService.setLoading(value);
  }

  reset() {
    this.account = {
      id: null, name: null, status: 1,
      is_deleted: 0, created_at: '', updated_at: '', bank_debt: null,
      account_name: null,
      account_number: null,
      is_sms: null,
      sms_temp: null,
      bin: null,
      sender: null
    };
  }

  getBankAccounts(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getBankAccounts', []))
      );
  }

  getBankAccount(id): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getBankAccount', []))
      );
  }

  updateBank(bank: BankAccount): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}update/${bank.id}`;
    return this.http.post<BankAccount>(url, bank)
      .pipe(
        catchError(this.handleError('updateBank', bank))
      );
  }

  getTransactions(accountid: number) {
    const url = Util.getUri(apiV1Url) + `muser/transaction/search`;
    let params = new HttpParams();
    params = params.append('account_id', accountid.toString());
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getTransactionTypes', []))
      );
  }
}
