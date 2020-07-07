import {Component} from '@angular/core';
import {ComplainService} from '../../services/order/complain.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Complain, ComplainType} from '../../models/Complain';
import {AuthService} from '../../auth.service';

@Component({
    selector: 'app-complain',
    templateUrl: './complain.component.html',
    styleUrls: ['./complain.component.css']
})

export class ComplainComponent {
    types: ComplainType[] = [];
    complains: Complain[] = [];
    modalRef: BsModalRef;
    complain: Complain;
    title = '';
    totalItems = 0;

    constructor(public complainService: ComplainService, public authService: AuthService, private modalService: BsModalService) {
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
        this.complainService.showLoading(true);
        this.complainService.getComplains()
            .subscribe(complains => {
                this.complains = complains.data.data;
                this.totalItems = complains.data.total;
                this.complainService.showLoading(false);
            });
    }

    pageChanged(event: any): void {
        this.complainService.search.page = event.page;
        this.getComplains();
    }

    public getComplainTypes() {
        this.complainService.getComplainTypes()
            .subscribe(types => {
                this.types = types.data;
            });
    }

    public editComplain(id: number, template) {
        this.title = 'Chi tiết đơn khiếu nại';
        this.complainService.getComplain(id)
            .subscribe(res => {
                this.complain = res.data.complain;
                this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
            });
    }

    public confirm(): void {
        this.complainService.showLoading(true);
        this.complainService.editComplain(this.complain)
            .subscribe(res => {
                this.modalRef.hide();
                this.getComplains();
            });
    }

    public decline(): void {
        this.modalRef.hide();
    }
}
