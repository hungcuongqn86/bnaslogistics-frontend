import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {LoadingService} from '../../loading.service';
import {Package} from '../../models/Package';
import {Complain} from '../../models/Complain';
import {History, ICart, IOrder, IOrderItem} from "../../models/interface";
import {Order} from "../../models/model";

export interface OrderCreate {
  id: number;
  user_id: number;
  shop_id: number;
  cart_ids: string;
  rate: number;
  count_product: number;
  count_link: number;
  tien_hang: number;
  phi_tam_tinh: number;
  phi_dich_vu: number;
  tong: number;
  vip: string;
  vip_dc: number;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class OrderService {
  static instance: OrderService;
  private handleError: HandleError;
  private moduleUri = 'order/';
  public search = {
    key: '',
    code: '',
    package_code: '',
    contract_code: '',
    status: '',
    pk_status: '',
    limit: 20,
    page: 1
  };
  public order: OrderCreate;
  public orderRe: IOrder;
  public bang_phi: { tong_can_nang: number, tong_can_nang_qd: number, tong_tien_can: number };

  constructor(private loadingService: LoadingService,
              private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('OrderService');
    if (!this.order) {
      this.reset();
    }

    if (!this.orderRe) {
      this.order_renew();
    }
    this.bang_phi = {tong_can_nang: 0, tong_can_nang_qd: 0, tong_tien_can: 0};
    return OrderService.instance = OrderService.instance || this;
  }

  showLoading(value: boolean) {
    this.loadingService.setLoading(value);
  }

  reset() {
    this.order = {
      id: null,
      user_id: null,
      shop_id: null,
      cart_ids: null,
      rate: 1,
      vip: null,
      vip_dc: 0,
      is_deleted: 0,
      created_at: '',
      updated_at: '',
      count_product: 0,
      count_link: 0,
      tien_hang: 0,
      phi_tam_tinh: 0,
      phi_dich_vu: 0,
      tong: 0
    };
  }

  order_renew() {
    this.orderRe = new Order();
  }

  getOrders(): Observable<any> {
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

  exportOrders(): Observable<any> {
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

  getCountByStatus(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}count`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getCountByStatus', []))
      );
  }

  getMyCountByStatus(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}mycount`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getMyCountByStatus', []))
      );
  }

  getMyOrders(): Observable<any> {
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

  getStatus(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}status`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getStatus', []))
      );
  }

  getHandles(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `muser/user/handles`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getHandles', []))
      );
  }

  getHistoryTypes(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}history/types`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getHistoryTypes', []))
      );
  }

  postHistory(data: History): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}history/create`;
    return this.http.post<History>(url, data)
      .pipe(
        catchError(this.handleError('postHistory', data))
      );
  }

  getComplains(param: { order_id: number }): Observable<any> {
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

  getComplain(id): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getComplain', []))
      );
  }

  getComplainTypes(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/types`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getComplainTypes', []))
      );
  }

  getOrder(id): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getOrder', []))
      );
  }

  updateOrder() {
    this.showLoading(true);
    if (this.order.id === null) {
      /*this.addOrder(this.order).subscribe(
        res => {
          this.updateSuccess(res);
        }
      );*/
    } else {
      this.editOrder(this.order).subscribe(
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

  public addOrder(cart: ICart): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}create`;
    return this.http.post<OrderCreate>(url, {id: cart.id})
      .pipe(
        catchError(this.handleError('addOrder', cart))
      );
  }

  public editOrder(order: any): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
    return this.http.post<OrderCreate>(url, order)
      .pipe(
        catchError(this.handleError('editOrder', order))
      );
  }

  public editOption(order: any): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}option`;
    return this.http.post<OrderCreate>(url, order)
      .pipe(
        catchError(this.handleError('editOption', order))
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


  getPkStatus(): Observable<any> {
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

  public editPackage(item: Package) {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}package/update`;
    return this.http.post<any>(url, item)
      .pipe(
        catchError(this.handleError('editPackage', item))
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
