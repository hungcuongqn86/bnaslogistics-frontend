import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url, clientid} from '../../const';
import {Router} from '@angular/router';
import {Shop} from '../../models/model';
import {LoadingService} from '../../loading.service';
import {IChinaWarehouse, IShop} from '../../models/interface';

@Injectable()
export class ShopService {
  static instance: ShopService;
  private handleError: HandleError;
  private moduleUri = 'mshop/';
  public search = {key: '', limit: 20, page: 1};
  public shop: IShop;

  constructor(private router: Router, private loadingService: LoadingService,
              private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ShopService');
    if (!this.shop) {
      this.reset();
    }
    return ShopService.instance = ShopService.instance || this;
  }

  public showLoading(value: boolean) {
    this.loadingService.setLoading(value);
  }

  public reset() {
    this.shop = new Shop();
  }

  public getMyShops(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}myshop/search`;
    let params = new HttpParams();
    Object.keys(this.search).map((key) => {
      params = params.append(key, this.search[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getMyShops', []))
      );
  }

  public getShop(id): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}myshop/detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getShop', []))
      );
  }

  public updateShop(shop: IShop): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}myshop/update/${shop.id}`;
    return this.http.post<IShop>(url, shop)
      .pipe(
        catchError(this.handleError('updateShop', shop))
      );
  }

  public deleteShop(item: IShop): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}myshop/delete/${item.id}`;
    return this.http.post<IShop>(url, item)
      .pipe(
        catchError(this.handleError('deleteShop', item))
      );
  }
}
