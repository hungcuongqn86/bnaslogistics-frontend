import {Injectable} from '@angular/core';
import {
    HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
    HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import {of} from 'rxjs';
import {catchError, last, map, tap} from 'rxjs/operators';

import {LoadingService} from './loading.service';
import {Util} from './helper/lib';
import {apiV1Url} from './const';

export interface Res {
    type: string;
    name: string;
    size: number;
    progress: number;
    data: Array<{ id: number, url: string }>;
    message: string;
    status: boolean;
}

@Injectable()
export class UploaderService {
    constructor(private http: HttpClient,
                private loadingService: LoadingService) {
    }

    upload(files: FileList) {
        if (!files) {
            return;
        }
        // XHR progress events.
        const url = Util.getUri(apiV1Url) + `media/upload`;
        const formData = new FormData();
        for (let index = 0; index < files.length; index++) {
            const f = files.item(index);
            formData.append('files[]', f);
        }
        const req = new HttpRequest('POST', url, formData, {
            reportProgress: true
        });
        return this.http.request(req).pipe(
            map(event => this.getEventMessage(event)),
            tap(res => {
                if (res.type === 'progress') {
                    this.showProgress(res);
                }
            }),
            last(),
            catchError(this.handleError())
        );
    }

    /** Return distinct message for sent, upload progress, & response events */
    private getEventMessage(event: HttpEvent<any>) {
        const res: Res = {
            type: '',
            name: '', size: 0, progress: 0, data: null
            , message: '', status: false
        };
        switch (event.type) {
            case HttpEventType.Sent:
                res.type = 'progress';
                break;
            case HttpEventType.UploadProgress:
                res.type = 'progress';
                res.progress = Math.round(100 * event.loaded / event.total);
                break;
            case HttpEventType.Response:
                res.type = 'progress';
                res.progress = 100;
                res.data = event.body.data;
                res.status = true;
                break;
            default:
                break;
        }
        return res;
    }

    /**
     * Returns a function that handles Http upload failures.
     * @param file - File object for file being uploaded
     *
     * When no `UploadInterceptor` and no server,
     * you'll end up here in the error handler.
     */
    private handleError() {
        const res: Res = {
            type: '',
            name: '', size: 0, progress: 0, data: null
            , message: '', status: false
        };

        return (error: HttpErrorResponse) => {
            // Let app keep running but indicate failure.
            return of(res);
        };
    }

    private showProgress(res) {
        this.loadingService.setProgress(res);
    }
}
