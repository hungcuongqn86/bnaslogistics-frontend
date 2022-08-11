import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {LoadingService} from '../../loading.service';
import {History, ICart, IOrder, IOrderItem, IPackage} from '../../models/interface';
import {Complain} from '../../models/Complain';
import {Order} from '../../models/model';

@Injectable()
export class OrderService {
  static instance: OrderService;
  private handleError: HandleError;
  private moduleUri = 'order/';
  public search = {
    key: '',
    code: '',
    type: '',
    package_code: '',
    contract_code: '',
    status: '',
    pk_status: '',
    limit: 20,
    page: 1
  };
  public order: IOrder;
  public orderRe: IOrder;
  public bang_phi: {
    tong_can_nang: number,
    tong_can_nang_qd: number,
    tong_kich_thuoc: number,
    tong_tien_can: number,
    tong_tien_dong_go: number,
    tong_tien_chong_soc: number,
    phi_van_phat_sinh: number
  };

  constructor(private loadingService: LoadingService,
              private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('OrderService');
    if (!this.order) {
      this.reset();
    }

    if (!this.orderRe) {
      this.order_renew();
    }
    this.bang_phi = {
      tong_can_nang: 0, tong_can_nang_qd: 0, tong_tien_can: 0,
      tong_kich_thuoc: 0,
      tong_tien_chong_soc: 0,
      tong_tien_dong_go: 0,
      phi_van_phat_sinh: 0
    };
    return OrderService.instance = OrderService.instance || this;
  }

  showLoading(value: boolean) {
    this.loadingService.setLoading(value);
  }

  reset() {
    this.order = new Order();
  }

  order_renew() {
    this.orderRe = new Order();
  }

  public getOrders(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
    let params = new HttpParams();
    Object.keys(this.search).map((key) => {
      if (this.search[key]) {
        params = params.append(key, this.search[key]);
      }
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getOrders', []))
      );
  }

  public exportOrders(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}export`;
    let params = new HttpParams();
    Object.keys(this.search).map((key) => {
      if (this.search[key]) {
        params = params.append(key, this.search[key]);
      }
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('exportOrders', []))
      );
  }

  public getCountByStatus(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}count`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getCountByStatus', []))
      );
  }

  public getMyCountByStatus(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}mycount`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getMyCountByStatus', []))
      );
  }

  public getMyOrders(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}myorder`;
    let params = new HttpParams();
    Object.keys(this.search).map((key) => {
      params = params.append(key, this.search[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getMyOrders', []))
      );
  }

  public getStatus(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}status`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getStatus', []))
      );
  }

  public getHandles(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `muser/user/handles`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getHandles', []))
      );
  }

  public getHistoryTypes(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}history/types`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getHistoryTypes', []))
      );
  }

  public postHistory(data: History): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}history/create`;
    return this.http.post<History>(url, data)
      .pipe(
        catchError(this.handleError('postHistory', data))
      );
  }

  public getComplains(param: { order_id: number }): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/search`;
    let params = new HttpParams();
    Object.keys(param).map((key) => {
      params = params.append(key, param[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getComplain', []))
      );
  }

  public getComplain(id): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getComplain', []))
      );
  }

  public getComplainTypes(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/types`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getComplainTypes', []))
      );
  }

  public getOrder(id): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getOrder', []))
      );
  }

  public reOrder(id: number): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}reorder/${id}`;
    return this.http.post<any>(url, {})
      .pipe(
        catchError(this.handleError('reOrder', []))
      );
  }

  public addOrder(cart: ICart): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}create`;
    return this.http.post<IOrder>(url, {id: cart.id})
      .pipe(
        catchError(this.handleError('addOrder', cart))
      );
  }

  public editOrder(order: IOrder, dirty: string): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}update/${order.id}`;
    return this.http.post<IOrder>(url, {dirty: dirty, value: order[dirty]})
      .pipe(
        catchError(this.handleError('editOrder', order))
      );
  }

  public postPc(data: any): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}phancong`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError('postPc', data))
      );
  }

  public postDatCoc(data: { id: number; dc_percent_value: number; dc_value: number; content: string; }): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}datcoc`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError('postDatCoc', data))
      );
  }

  public getPkStatus(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}package/status`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getPkStatus', []))
      );
  }

  public addPackage(order: number) {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}package/create`;
    return this.http.post<any>(url, {order_id: order})
      .pipe(
        catchError(this.handleError('addPackage', {order_id: order}))
      );
  }

  public editPackage(item: IPackage, dirty: string) {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}package/update/${item.id}`;
    return this.http.post<any>(url, {dirty: dirty, value: item[dirty]})
      .pipe(
        catchError(this.handleError('editPackage', item))
      );
  }

  public deletePackage(item: IPackage) {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}package/delete/${item.id}`;
    return this.http.post<any>(url, {})
      .pipe(
        catchError(this.handleError('deletePackage', item))
      );
  }

  public editOrderItem(item: IOrderItem, dirty: string) {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}order_item/update/${item.id}`;
    return this.http.post<any>(url, {dirty: dirty, value: item[dirty]})
      .pipe(
        catchError(this.handleError('editOrderItem', item))
      );
  }

  public addComplain(data: Complain): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/create`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError('addComplain', data))
      );
  }

  public editComplain(data: Complain): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/update`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError('editComplain', data))
      );
  }

  public deleteComplain(id: number): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/delete/${id}`;
    return this.http.post<any>(url, {})
      .pipe(
        catchError(this.handleError('deleteComplain', {}))
      );
  }

  public getComments(orderId: number): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}comment/getall`;
    let params = new HttpParams();
    params = params.append('orderId', orderId.toString());
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getComments', []))
      );
  }

  public setIsRead(orderId: number): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}comment/isread`;
    return this.http.post<any>(url, {order_id: orderId})
      .pipe(
        catchError(this.handleError('setIsRead', []))
      );
  }

  public addComments(data: { order_id: number, content: string, is_admin: number }): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}comment/create`;
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError('addComments', data))
      );
  }
}
