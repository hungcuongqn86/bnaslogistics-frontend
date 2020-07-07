import {Component, OnInit, ViewEncapsulation, TemplateRef, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {WarehouseService} from '../../../services/order/warehouse.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subscription} from 'rxjs';
import {Bill, BillStatus} from '../../../models/Warehouse';
import {AuthService} from '../../../auth.service';

@Component({
    selector: 'app-warehouse-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class BillComponent implements OnInit, OnDestroy {
    bill: Bill;
    bills: Bill;
    status: BillStatus[] = [];
    counts: { status: number, total: number }[] = [];
    totalItems = 0;
    modalRef: BsModalRef;
    errorMessage: string[] = [];
    sub: Subscription;

    constructor(public warehouseService: WarehouseService, private modalService: BsModalService, public authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.getBillStatus();
        this.searchBills();
    }

    pageChanged(event: any): void {
        this.warehouseService.billSearch.page = event.page;
        this.searchBills();
    }

    public searchBills() {
        this.warehouseService.showLoading(true);
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.sub = this.warehouseService.getBills()
            .subscribe(bills => {
                this.bills = bills.data.data;
                this.totalItems = bills.data.total;
                this.warehouseService.showLoading(false);
            });
    }

    selectTab(status: string = null) {
        this.warehouseService.billSearch.status = status;
        this.searchBills();
    }

    public gotoDetail(id) {
        const win = window.open(`./warehouse/bill/detail/${id}`, '_blank');
        win.focus();
    }

    public deleteBill(item: Bill, template: TemplateRef<any>) {
        this.bill = item;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    private _deleteBill() {
        this.warehouseService.deleteBill(this.bill.id)
            .subscribe(data => {
                this.searchBills();
            });
    }

    public getBillStatus() {
        this.warehouseService.showLoading(true);
        this.warehouseService.getBillStatus()
            .subscribe(data => {
                this.status = data.data;
                this.warehouseService.showLoading(false);
            });
    }

    confirm(): void {
        this._deleteBill();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
