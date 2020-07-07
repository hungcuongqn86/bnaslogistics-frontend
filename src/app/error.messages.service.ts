import {Injectable} from '@angular/core';

@Injectable()
export class ErrorMessagesService {
    static instance: ErrorMessagesService;
    public errorModalShown = false;
    public formTitle = 'Thông báo lỗi';
    public message = '';
    public messages: string[] = [];

    constructor() {
        return ErrorMessagesService.instance = ErrorMessagesService.instance || this;
    }
}
