import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../http-error-handler.service';
import {Util} from '../helper/lib';
import {apiUrl} from '../const';
import {Router} from '@angular/router';
import {Version} from '../models/Version';

@Injectable()
export class VersionsService {
    static instance: VersionsService;
    private handleError: HandleError;
    public search = {page_size: 10, page: 1};
    public version: Version;

    constructor(private router: Router, private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('VersionsService');
        if (!this.version) {
            this.reset();
        }
        return VersionsService.instance = VersionsService.instance || this;
    }

    reset() {
        this.version = {
            id: null
            , app_code: ''
            , partner: ''
            , version_code: null
            , link_apk: null
            , is_deleted: 0
            , created_at: ''
            , updated_at: ''
        };
    }

    getVersions(search): Observable<any> {
        const url = Util.getUri(apiUrl) + `version/search`;
        let params = new HttpParams();
        Object.keys(search).map((key) => {
            params = params.append(key, search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getVersions', []))
            );
    }

    getVersion(id): Observable<any> {
        const url = Util.getUri(apiUrl) + `version/detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getVersion', []))
            );
    }

    updateVersion() {
        if (this.version.id === null) {
            this.addVersion(this.version).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editVersion(this.version).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        }
    }

    private updateSuccess(res: any) {
        if (res.status) {
            this.router.navigate(['/version']);
        }
    }

    public addVersion(version: Version): Observable<any> {
        const url = Util.getUri(apiUrl) + `version/create`;
        return this.http.post<Version>(url, version)
            .pipe(
                catchError(this.handleError('addBase', version))
            );
    }

    public editVersion(version: Version): Observable<any> {
        const url = Util.getUri(apiUrl) + `version/update`;
        return this.http.put<Version>(url, version)
            .pipe(
                catchError(this.handleError('editBase', version))
            );
    }
}
