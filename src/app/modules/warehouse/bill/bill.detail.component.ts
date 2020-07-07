import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WarehouseService} from '../../../services/order/warehouse.service';
import {Bill} from '../../../models/Warehouse';
import {Cart} from '../../../models/Cart';
import {Subscription} from 'rxjs';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../../auth.service';

@Component({
    selector: 'app-bill-detail',
    templateUrl: './bill.detail.component.html',
    styleUrls: ['./bill.detail.component.css']
})

export class BillDetailComponent implements OnInit, OnDestroy {
    bill: Bill = null;
    id: number;
    date: string;
    report: { tong_can_nang: number, tong_tien_can: number, tong_thanh_ly: number };
    carts: Cart[] = [];
    sub: Subscription;
    errorMessage: string[] = [];
    modalRef: BsModalRef;

    constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService,
                public warehouseService: WarehouseService, private modalService: BsModalService) {
        this.report = {tong_can_nang: 0, tong_thanh_ly: 0, tong_tien_can: 0};
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.id !== null) {
            this.getBill();
        }
        const currentDate = new Date();
        const day = ('0' + currentDate.getDate()).slice(-2);
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const year = currentDate.getFullYear();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        this.date = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    private getBill() {
        this.warehouseService.getBill(this.id)
            .subscribe(data => {
                this.bill = data.data.bill;
                this.genReport();
            });
    }

    private genReport() {
        this.report = {tong_can_nang: 0, tong_thanh_ly: 0, tong_tien_can: 0};
        for (let i = 0; i < this.bill.package.length; i++) {
            this.report.tong_can_nang = Number(this.report.tong_can_nang) + Number(this.bill.package[i].weight_qd);
            this.report.tong_can_nang = Math.round(this.report.tong_can_nang * 100) / 100;
            this.report.tong_tien_can = Number(this.report.tong_tien_can) + Number(this.bill.package[i].tien_can);
            this.report.tong_tien_can = Math.round(this.report.tong_tien_can * 100) / 100;
            this.report.tong_thanh_ly = Number(this.report.tong_thanh_ly) + Number(this.bill.package[i].tien_thanh_ly);
            this.report.tong_thanh_ly = Math.round(this.report.tong_thanh_ly * 100) / 100;
            for (let j = 0; j < this.bill.package[i].order.cart.length; j++) {
                const checkExit = this.carts.findIndex(x => x.id === this.bill.package[i].order.cart[j].id);
                if (checkExit < 0) {
                    this.carts.push(this.bill.package[i].order.cart[j]);
                }
            }
        }
    }

    public xuatKho(item: Bill, template: TemplateRef<any>) {
        this.warehouseService.showLoading(true);
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.sub = this.warehouseService.billConfirm(item.id)
            .subscribe(data => {
                this.warehouseService.showLoading(false);
                if (!data.status) {
                    this.errorMessage = data.data;
                    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
                } else {
                    this.getBill();
                }
            });
    }

    public backlist() {
        this.router.navigate(['/warehouse/bill']);
    }

    decline(): void {
        this.errorMessage = [];
        this.modalRef.hide();
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
