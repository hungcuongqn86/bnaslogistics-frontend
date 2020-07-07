import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../auth.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
    public notify = [];

    constructor(public auth: AuthService, public notificationService: NotificationService, private router: Router) {

    }

    ngOnInit() {
        this.getNotyfication();
    }

    public getNotyfication() {
        this.auth.getAllComment()
            .subscribe(notiData => {
                this.notify = notiData.data;
            });
    }

    gotoOrder(orderId: number) {
        if (this.auth.user.type) {
            this.router.navigate([`./order/myorder/detail/${orderId}`]);
        } else {
            this.router.navigate([`./order/list/detail/${orderId}`]);
        }
    }
}
