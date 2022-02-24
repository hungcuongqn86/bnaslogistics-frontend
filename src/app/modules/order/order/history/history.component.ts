import {Component, OnInit, TemplateRef} from '@angular/core';
import {OrderService} from '../../../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {HistoryType, History} from "../../../../models/interface";

@Component({
    selector: 'app-order-detail-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
    errorMessage: string[] = [];
    types: HistoryType[] = [];
    history: History;
    modalRef: BsModalRef;

    constructor(public orderService: OrderService, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.reset();
        this.getTypes();
    }

    public reset() {
        this.history = {
            id: null,
            user_name: null,
            content: null,
            type: null,
            created_at: null,
            is_deleted: 0,
            order_id: null,
            updated_at: null,
            user_id: null
        };
    }

    public getTypes() {
        this.orderService.showLoading(true);
        this.orderService.getHistoryTypes()
            .subscribe(types => {
                this.types = types.data;
                this.orderService.showLoading(false);
            });
    }

    public addHistory(template) {
        this.history.order_id = this.orderService.orderRe.id;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirmHistory(): void {
        this.errorMessage = [];
        this.orderService.postHistory(this.history)
            .subscribe(res => {
                if (res.status) {
                    this.reloadData();
                    this.errorMessage = [];
                    this.reset();
                    this.modalRef.hide();
                } else {
                    for (let i = 0; i < res.data.length; i++) {
                        this.errorMessage.push(res.data[i]);
                    }
                }
            });
    }

    declineHistory(): void {
        this.errorMessage = [];
        this.reset();
        this.modalRef.hide();
    }

    reloadData() {
        this.orderService.showLoading(true);
        this.orderService.getOrder(this.orderService.orderRe.id)
            .subscribe(order => {
                this.orderService.orderRe = order.data.order;
                this.orderService.showLoading(false);
            });
    }
}
