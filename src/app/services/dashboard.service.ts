import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DashboardService {
    static instance: DashboardService;

    constructor(public http: HttpClient) {
        return DashboardService.instance = DashboardService.instance || this;
    }
}
