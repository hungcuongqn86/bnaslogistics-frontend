import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NotificationService {
    static instance: NotificationService;

    constructor(public http: HttpClient) {
        return NotificationService.instance = NotificationService.instance || this;
    }
}
