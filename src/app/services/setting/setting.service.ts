import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {Router} from '@angular/router';
import {ISetting, Setting} from '../../models/Setting';
import {LoadingService} from '../../loading.service';

@Injectable()
export class SettingService {
  static instance: SettingService;
  private handleError: HandleError;
  private moduleUri = 'setting/';
  private vipModuleUri = 'vip/';
  private serviceFeeModuleUri = 'service_fee/';
  public search = {key: '', page_size: 100, page: 1};
  public vipSearchParam = {key: '', page_size: 100, page: 1};
  public serviceFeeSearchParam = {key: '', page_size: 100, page: 1};
  public setting: ISetting = new Setting();

  constructor(private router: Router, private loadingService: LoadingService,
              private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('SettingService');
    if (!this.setting) {
      this.reset();
    }
    return SettingService.instance = SettingService.instance || this;
  }

  showLoading(value: boolean) {
    this.loadingService.setLoading(value);
  }

  reset() {
    this.setting = {
      id: null, title: null, key: null, value: null, is_deleted: 0, created_at: '', updated_at: ''
    };
  }

  getSettings(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
    let params = new HttpParams();
    Object.keys(this.search).map((key) => {
      params = params.append(key, this.search[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getSettings', []))
      );
  }

  getVips(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.vipModuleUri}search`;
    let params = new HttpParams();
    Object.keys(this.vipSearchParam).map((key) => {
      params = params.append(key, this.vipSearchParam[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getVips', []))
      );
  }

  getServiceFees(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.serviceFeeModuleUri}search`;
    let params = new HttpParams();
    Object.keys(this.serviceFeeSearchParam).map((key) => {
      params = params.append(key, this.serviceFeeSearchParam[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getServiceFees', []))
      );
  }

  getSetting(id): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getSetting', []))
      );
  }

  updateSetting() {
    this.showLoading(true);
    if (this.setting.id === null) {
      this.addSetting(this.setting).subscribe(
        res => {
          this.updateSuccess(res);
        }
      );
    } else {
      this.editSetting(this.setting).subscribe(
        res => {
          this.updateSuccess(res);
        }
      );
    }
  }

  private updateSuccess(res: any) {
    if (res.status) {
      // this.router.navigate(['/owner']);
    }
    this.showLoading(false);
  }

  public addSetting(setting: Setting): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}create`;
    return this.http.post<Setting>(url, setting)
      .pipe(
        catchError(this.handleError('addSetting', setting))
      );
  }

  public editSetting(setting: Setting): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
    return this.http.post<Setting>(url, setting)
      .pipe(
        catchError(this.handleError('editSetting', setting))
      );
  }
}
