import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {Router} from '@angular/router';
import {IChinaWarehouse, ICratingFee, IInspectionFee, IServiceFee, ISetting, ITransportFee, IVip} from '../../models/interface';
import {Setting} from '../../models/model';
import {LoadingService} from '../../loading.service';

@Injectable()
export class SettingService {
  static instance: SettingService;
  private handleError: HandleError;
  private moduleUri = 'setting/';
  private vipModuleUri = 'vip/';
  private chinaWarehouseModuleUri = 'china_warehouses/';
  private serviceFeeModuleUri = 'service_fee/';
  private transportFeeModuleUri = 'transport_fees/';
  private inspectionFeeModuleUri = 'inspection_fees/';
  private cratingFeeModuleUri = 'crating_fees/';
  private warehouseModuleUri = 'warehouses/';
  public search = {key: '', page_size: 100, page: 1};
  public vipSearchParam = {key: '', page_size: 100, page: 1};
  public chinaWarehouseSearchParam = {key: '', page_size: 100, page: 1};
  public serviceFeeSearchParam = {key: '', page_size: 100, page: 1};
  public transportFeeSearchParam = {key: '', type: 1, warehouse_id: 1, page_size: 100, page: 1};
  public inspectionFeeSearchParam = {key: '', page_size: 100, page: 1};
  public cratingFeeSearchParam = {key: '', page_size: 100, page: 1};
  public warehouseSearchParam = {key: '', page_size: 100, page: 1};

  constructor(private router: Router, private loadingService: LoadingService,
              private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('SettingService');
    return SettingService.instance = SettingService.instance || this;
  }

  showLoading(value: boolean) {
    this.loadingService.setLoading(value);
  }

  // =============================================
  // CHINA Warehouse
  public getChinaWarehouses(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.chinaWarehouseModuleUri}search`;
    let params = new HttpParams();
    Object.keys(this.chinaWarehouseSearchParam).map((key) => {
      params = params.append(key, this.chinaWarehouseSearchParam[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getChinaWarehouses', []))
      );
  }

  public addChinaWarehouse(item: IChinaWarehouse): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.chinaWarehouseModuleUri}create`;
    return this.http.post<IChinaWarehouse>(url, item)
      .pipe(
        catchError(this.handleError('addChinaWarehouse', item))
      );
  }

  public editChinaWarehouse(item: IChinaWarehouse): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.chinaWarehouseModuleUri}update/${item.id}`;
    return this.http.post<IChinaWarehouse>(url, item)
      .pipe(
        catchError(this.handleError('editChinaWarehouse', item))
      );
  }

  public deleteChinaWarehouse(item: IChinaWarehouse): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.chinaWarehouseModuleUri}delete/${item.id}`;
    return this.http.post<IChinaWarehouse>(url, item)
      .pipe(
        catchError(this.handleError('deleteChinaWarehouse', item))
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

  public getVip(vipid: number): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.vipModuleUri}detail/${vipid}`;
    return this.http.get<any>(url, {})
      .pipe(
        catchError(this.handleError('getVip', []))
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
  // CratingFees
  public getCratingFees(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.cratingFeeModuleUri}search`;
    let params = new HttpParams();
    Object.keys(this.cratingFeeSearchParam).map((key) => {
      params = params.append(key, this.cratingFeeSearchParam[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getCratingFees', []))
      );
  }

  public addCratingFee(item: ICratingFee): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.cratingFeeModuleUri}create`;
    return this.http.post<ICratingFee>(url, item)
      .pipe(
        catchError(this.handleError('addCratingFee', item))
      );
  }

  public editCratingFee(item: ICratingFee): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.cratingFeeModuleUri}update/${item.id}`;
    return this.http.post<ICratingFee>(url, item)
      .pipe(
        catchError(this.handleError('editCratingFee', item))
      );
  }

  public deleteCratingFee(item: ICratingFee): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.cratingFeeModuleUri}delete/${item.id}`;
    return this.http.post<ICratingFee>(url, item)
      .pipe(
        catchError(this.handleError('deleteCratingFee', item))
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

  public addTransportFee(item: ITransportFee): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.transportFeeModuleUri}create`;
    return this.http.post<ITransportFee>(url, item)
      .pipe(
        catchError(this.handleError('addTransportFee', item))
      );
  }

  public editTransportFee(item: ITransportFee): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.transportFeeModuleUri}update/${item.id}`;
    return this.http.post<ITransportFee>(url, item)
      .pipe(
        catchError(this.handleError('editTransportFee', item))
      );
  }

  public deleteTransportFee(item: ITransportFee): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.transportFeeModuleUri}delete/${item.id}`;
    return this.http.post<ITransportFee>(url, item)
      .pipe(
        catchError(this.handleError('deleteTransportFee', item))
      );
  }

  // =============================================
  // Setting
  public getSettings(): Observable<any> {
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

  public getSetting(id): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getSetting', []))
      );
  }

  public editSetting(setting: ISetting): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
    return this.http.post<ISetting>(url, setting)
      .pipe(
        catchError(this.handleError('editSetting', setting))
      );
  }
}
