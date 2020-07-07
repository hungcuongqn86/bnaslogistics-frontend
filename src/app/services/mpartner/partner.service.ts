import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {Router} from '@angular/router';
import {Partner} from '../../models/Partner';
import {LoadingService} from '../../loading.service';

@Injectable()
export class PartnerService {
    static instance: PartnerService;
    private handleError: HandleError;
    private moduleUri = 'mpartner/partner/';
    public search = {key: '', page_size: 10, page: 1};
    public partner: Partner;

    constructor(private router: Router, private loadingService: LoadingService,
                private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('PartnerService');
        if (!this.partner) {
            this.reset();
        }
        return PartnerService.instance = PartnerService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    reset() {
        this.partner = {
            id: null, name: null, phone_number: null, facebook: null, email: null
            , status: 1, is_deleted: 0, created_at: '', updated_at: ''
        };
    }

    getPartners(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            params = params.append(key, this.search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getPartners', []))
            );
    }

    getPartner(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getPartner', []))
            );
    }

    updatePartner() {
        this.showLoading(true);
        if (this.partner.id === null) {
            this.addPartner(this.partner).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editPartner(this.partner).subscribe(
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

    public addPartner(owner: Partner): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}create`;
        return this.http.post<Partner>(url, owner)
            .pipe(
                catchError(this.handleError('addPartner', owner))
            );
    }

    public editPartner(owner: Partner): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
        return this.http.put<Partner>(url, owner)
            .pipe(
                catchError(this.handleError('editPartner', owner))
            );
    }
}
