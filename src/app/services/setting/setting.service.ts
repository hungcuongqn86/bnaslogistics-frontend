import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {Router} from '@angular/router';
import {IInspectionFee, IServiceFee, ISetting, IVip} from '../../models/interface';
import {Setting} from '../../models/model';
import {LoadingService} from '../../loading.service';

@Injectable()
export class SettingService {
  static instance: SettingService;
  private handleError: HandleError;
  private moduleUri = 'setting/';
  private vipModuleUri = 'vip/';
  private serviceFeeModuleUri = 'service_fee/';
  private transportFeeModuleUri = 'transport_fees/';
  private inspectionFeeModuleUri = 'inspection_fees/';
  private warehouseModuleUri = 'warehouses/';
  public search = {key: '', page_size: 100, page: 1};
  public vipSearchParam = {key: '', page_size: 100, page: 1};
  public serviceFeeSearchParam = {key: '', page_size: 100, page: 1};
  public transportFeeSearchParam = {key: '', type: 1, warehouse_id: 1, page_size: 100, page: 1};
  public inspectionFeeSearchParam = {key: '', page_size: 100, page: 1};
  public warehouseSearchParam = {key: '', page_size: 100, page: 1};
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

  // =============================================
  // VIP
  public getVips(): Observable<any> {
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

  public addVip(item: IVip): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.vipModuleUri}create`;
    return this.http.post<IVip>(url, item)
      .pipe(
        catchError(this.handleError('addVip', item))
      );
  }

  public editVip(item: IVip): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.vipModuleUri}update/${item.id}`;
    return this.http.post<IVip>(url, item)
      .pipe(
        catchError(this.handleError('editVip', item))
      );
  }

  public deleteVip(item: IVip): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.vipModuleUri}delete/${item.id}`;
    return this.http.post<IVip>(url, item)
      .pipe(
        catchError(this.handleError('deleteVip', item))
      );
  }

  // =============================================
  // ServiceFees
  public getServiceFees(): Observable<any> {
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

  public addServiceFees(item: IServiceFee): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.serviceFeeModuleUri}create`;
    return this.http.post<IServiceFee>(url, item)
      .pipe(
        catchError(this.handleError('addServiceFees', item))
      );
  }

  public editServiceFees(item: IServiceFee): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.serviceFeeModuleUri}update/${item.id}`;
    return this.http.post<IServiceFee>(url, item)
      .pipe(
        catchError(this.handleError('editServiceFees', item))
      );
  }

  public deleteServiceFees(item: IServiceFee): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.serviceFeeModuleUri}delete/${item.id}`;
    return this.http.post<IServiceFee>(url, item)
      .pipe(
        catchError(this.handleError('deleteServiceFees', item))
      );
  }
  //=============================================

  public getWarehouses(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.warehouseModuleUri}search`;
    let params = new HttpParams();
    Object.keys(this.warehouseSearchParam).map((key) => {
      params = params.append(key, this.warehouseSearchParam[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getWarehouses', []))
      );
  }

  // =============================================
  // InspectionFees
  public getInspectionFees(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.inspectionFeeModuleUri}search`;
    let params = new HttpParams();
    Object.keys(this.inspectionFeeSearchParam).map((key) => {
      params = params.append(key, this.inspectionFeeSearchParam[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getInspectionFees', []))
      );
  }

  public addInspectionFee(item: IInspectionFee): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.inspectionFeeModuleUri}create`;
    return this.http.post<IInspectionFee>(url, item)
      .pipe(
        catchError(this.handleError('addInspectionFee', item))
      );
  }

  public editInspectionFee(item: IInspectionFee): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.inspectionFeeModuleUri}update/${item.id}`;
    return this.http.post<IInspectionFee>(url, item)
      .pipe(
        catchError(this.handleError('editInspectionFee', item))
      );
  }

  public deleteInspectionFee(item: IInspectionFee): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.inspectionFeeModuleUri}delete/${item.id}`;
    return this.http.post<IInspectionFee>(url, item)
      .pipe(
        catchError(this.handleError('deleteInspectionFee', item))
      );
  }

  // =============================================
  // TransportFees

  getTransportFees(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.transportFeeModuleUri}search`;
    let params = new HttpParams();
    Object.keys(this.transportFeeSearchParam).map((key) => {
      params = params.append(key, this.transportFeeSearchParam[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getTransportFees', []))
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

  public addSetting(setting: ISetting): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}create`;
    return this.http.post<Setting>(url, setting)
      .pipe(
        catchError(this.handleError('addSetting', setting))
      );
  }

  public editSetting(setting: ISetting): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
    return this.http.post<Setting>(url, setting)
      .pipe(
        catchError(this.handleError('editSetting', setting))
      );
  }
}
