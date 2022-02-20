import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {forkJoin, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiUrl} from '../../const';
import {LoadingService} from '../../loading.service';
import {Cart} from '../../models/Cart';
import {ICart, ICartItem} from "../../models/interface";

@Injectable()
export class CartService {
  static instance: CartService;
  private handleError: HandleError;
  private moduleUri = 'cart/';
  public search = {page_size: 10, page: 1};

  constructor(private loadingService: LoadingService,
              private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('OwnerService');
    return CartService.instance = CartService.instance || this;
  }

  showLoading(value: boolean) {
    this.loadingService.setLoading(value);
  }

  getCartWithShops(): Observable<any> {
    const url = Util.getUri(apiUrl) + `${this.moduleUri}search`;
    let params = new HttpParams();
    Object.keys(this.search).map((key) => {
      params = params.append(key, this.search[key]);
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getCartWithShops', []))
      );
  }

  public updateCart(cart: ICart): Observable<any> {
    const url = Util.getUri(apiUrl) + `${this.moduleUri}update`;
    return this.http.post<ICart>(url, cart)
      .pipe(
        catchError(this.handleError('updateCart', cart))
      );
  }

  public updateCartItem(cartItem: ICartItem): Observable<any> {
    const url = Util.getUri(apiUrl) + `${this.moduleUri}cart_item/update`;
    return this.http.post<ICartItem>(url, cartItem)
      .pipe(
        catchError(this.handleError('updateCartItem', cartItem))
      );
  }

  public deleteCartItem(id: number) {
    const url = Util.getUri(apiUrl) + `${this.moduleUri}cart_item/delete/${id}`;
    return this.http.post<any>(url, {id: id})
      .pipe(
        catchError(this.handleError('deleteCartItem', {id: id}))
      );
  }

  public updateMultipleCart(carts: Cart[]): Observable<any[]> {
    const url = Util.getUri(apiUrl) + `${this.moduleUri}update`;
    const res = [];
    for (let i = 0; i < carts.length; i++) {
      const response = this.http.post<Cart>(url, carts[i]);
      res.push(response);
    }
    return forkJoin(res);
  }

  public deleteCart(ids: string) {
    const url = Util.getUri(apiUrl) + `${this.moduleUri}delete`;
    return this.http.post<any>(url, {ids: ids})
      .pipe(
        catchError(this.handleError('updateCart', {ids: ids}))
      );
  }
}
