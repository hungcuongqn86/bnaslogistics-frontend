import {Component} from '@angular/core';
import {OrderService, HistoryType} from '../../../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Complain, ComplainProducts, ComplainType} from '../../../../models/Complain';
import {UploaderService} from '../../../../uploader.service';

@Component({
    selector: 'app-order-detail-complain',
    templateUrl: './complain.component.html',
    providers: [UploaderService],
    styleUrls: ['./complain.component.css']
})

export class ComplainComponent {
    types: ComplainType[] = [];
    complains: Complain[] = [];
    modalRef: BsModalRef;
    complain: Complain;
    title = '';

    constructor(public orderService: OrderService, private modalService: BsModalService, private uploaderService: UploaderService) {
        this.getComplains();
        this.getComplainTypes();
        this.complainReset();
    }

    private complainReset() {
        this.complain = {
            id: null,
            complain_products: [],
            content: null,
            created_at: null,
            is_deleted: null,
            money_request: null,
            order_id: null,
            order: null,
            status: null,
            otype: null,
            type: null,
            updated_at: null,
            user_id: null
        };
    }

    public getComplains() {
        this.orderService.showLoading(true);
        this.orderService.getComplains({order_id: this.orderService.orderRe.id})
            .subscribe(complains => {
                this.complains = complains.data;
                this.orderService.showLoading(false);
            });
    }

    public getComplainTypes() {
        this.orderService.getComplainTypes()
            .subscribe(types => {
                this.types = types.data;
            });
    }

    public uploadExc(input: HTMLInputElement, item: ComplainProducts) {
        this.uploaderService.upload(input.files).subscribe(
            res => {
                if (res.status) {
                    item.media = res.data;
                }
                input.value = null;
            }
        );
    }

    public addComplain(template) {
        this.complainReset();
        this.title = 'Tạo đơn khiếu nại';
        this.complain.order_id = this.orderService.orderRe.id;
        this.complain.status = 1;
        this.complain.is_deleted = 0;
        this.complain.complain_products = [];
        for (let i = 0; i < this.orderService.orderRe.cart.length; i++) {
            const pro: ComplainProducts = {
                id: null, cart_id: null, complain_id: null, note: null, created_at: null, updated_at: null,
                cart: this.orderService.orderRe.cart[i], is_deleted: null, media: null
            };
            this.complain.complain_products.push(pro);
        }
        this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
    }

    public editComplain(id: number, template) {
        this.title = 'Chi tiết đơn khiếu nại';
        this.orderService.getComplain(id)
            .subscribe(res => {
                this.complain = res.data.complain;
                this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
            });
    }

    public confirm(): void {
        this.orderService.showLoading(true);
        if (this.complain && this.complain.id) {
            this.orderService.editComplain(this.complain)
                .subscribe(res => {
                    this.modalRef.hide();
                    this.getComplains();
                });
        } else {
            this.orderService.addComplain(this.complain)
                .subscribe(res => {
                    this.modalRef.hide();
                    this.getComplains();
                });
        }
    }

    public decline(): void {
        this.modalRef.hide();
    }
}
