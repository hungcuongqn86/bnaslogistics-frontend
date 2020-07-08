import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url, clientid} from '../../const';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {Transaction} from '../../models/Transaction';
import {LoadingService} from '../../loading.service';

@Injectable()
export class UserService {
    static instance: UserService;
    private handleError: HandleError;
    private moduleUri = 'muser/user/';
    public search = {key: '', limit: 20, page: 1};
    public tSearch = {limit: 20, page: 1};
    public user: User;
    public transaction: Transaction;

    constructor(private router: Router, private loadingService: LoadingService,
                private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('UsserService');
        if (!this.user) {
            this.reset();
        }
        if (!this.transaction) {
            this.transaction = {
                id: null, user_id: null, code: null, content: null, type: null, value: null, otype: null,
                debt: null, is_deleted: 0, created_at: '', updated_at: '', bank_account: null, bank_debt: null, user: null
            };
        }
        return UserService.instance = UserService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    reset() {
        this.user = {
            id: null, name: null, partner: null, role_id: null, roles: null, transaction: null, type: null, deposit: null,
            phone_number: null, password: null, c_password: null, partner_id: clientid, cost_percent: null, weight_price: null,
            email: null, is_deleted: 0, created_at: '', updated_at: '', image: null, debt: null, rate: null
        };
    }

    getRoles(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `muser/role/search`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getRoles', []))
            );
    }

    getUsers(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            params = params.append(key, this.search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getUsers', []))
            );
    }

    getCustumers(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}custumers`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            params = params.append(key, this.search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getCustumers', []))
            );
    }

    getTransactionTypes() {
        const url = Util.getUri(apiV1Url) + `muser/transaction/types`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getTransactionTypes', []))
            );
    }

    getTransactions(userid: number) {
        const url = Util.getUri(apiV1Url) + `muser/transaction/search`;
        let params = new HttpParams();
        params = params.append('user_id', userid.toString());
        Object.keys(this.tSearch).map((key) => {
            params = params.append(key, this.tSearch[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getTransactionTypes', []))
            );
    }

    getUser(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getUser', []))
            );
    }

    updateUser() {
        this.showLoading(true);
        if (this.user.id === null) {
            this.addUser(this.user).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editUser(this.user).subscribe(
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

    public addUser(user: User): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}create`;
        return this.http.post<User>(url, user)
            .pipe(
                catchError(this.handleError('addOwner', user))
            );
    }

    public editUser(user: User): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
        return this.http.post<User>(url, user)
            .pipe(
                catchError(this.handleError('editOwner', user))
            );
    }

    public addTransaction(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `muser/transaction/create`;
        this.transaction.user_id = this.user.id;
        return this.http.post<User>(url, this.transaction)
            .pipe(
                catchError(this.handleError('addTransaction', this.transaction))
            );
    }
}
