import {Component} from '@angular/core';
import {OrderService, HistoryType} from '../../../../services/order/order.service';

@Component({
    selector: 'app-order-detail-myhistory',
    templateUrl: './myhistory.component.html',
    styleUrls: ['./myhistory.component.css']
})

export class MyhistoryComponent {
    types: HistoryType[] = [];

    constructor(public orderService: OrderService) {
        this.getTypes();
    }

    public getTypes() {
        this.orderService.showLoading(true);
        this.orderService.getHistoryTypes()
            .subscribe(types => {
                this.types = types.data;
                this.orderService.showLoading(false);
            });
    }
}
