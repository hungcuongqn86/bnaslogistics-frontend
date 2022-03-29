import {Component, OnDestroy, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {WarehouseService} from '../../../services/order/warehouse.service';
import {WarehouseWait} from '../../../models/Warehouse';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-warehouse-wait',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class WaitComponent implements OnInit, OnDestroy {
  warehouseWait: WarehouseWait[];
  totalItems = 0;
  errorMessage: string[] = [];
  sub: Subscription;
  modalRef: BsModalRef;

  constructor(public warehouseService: WarehouseService, private modalService: BsModalService, public authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.searchWarehouseWait();
  }

  pageChanged(event: any): void {
    this.warehouseService.waitSearch.page = event.page;
    this.searchWarehouseWait();
  }

  public searchWarehouseWait() {
    this.warehouseService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.warehouseService.getWarehouseWait()
      .subscribe(data => {
        this.warehouseWait = this.genData(data.data.data);
        this.totalItems = data.data.total;
        this.warehouseService.showLoading(false);
      });
  }

  private genData(data: WarehouseWait[]): WarehouseWait[] {
    for (let i = 0; i < data.length; i++) {
      const packages = [];
      for (let j = 0; j < data[i].order.length; j++) {
        for (let k = 0; k < data[i].order[j].package.length; k++) {
          const checkExit = packages.findIndex(x => x.id === data[i].order[j].package[k].id);
          if (checkExit < 0) {
            packages.push(data[i].order[j].package[k]);
          }
        }
      }
      data[i].package = packages;
    }
    return data;
  }

  public bill(item: WarehouseWait, template: TemplateRef<any>) {
    const user_id = item.id;
    const pkidlist = [];
    for (let i = 0; i < item.order.length; i++) {
      for (let j = 0; j < item.order[i].package.length; j++) {
        if (item.order[i].package[j].package_code) {
          pkidlist.push(item.order[i].package[j].package_code);
        }
      }
    }
    this.warehouseService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.warehouseService.bill(user_id, pkidlist)
      .subscribe(data => {
        this.warehouseService.showLoading(false);
        if (!data.status) {
          this.errorMessage = data.data;
          this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
        } else {
          this.router.navigate([`/warehouse/bill/detail/${data.data.id}`]);
        }
      });
  }

  public checkBill(item: WarehouseWait, show: boolean) {
    if (show) {
      let tien_xuat_kho = 0;
      for (let i = 0; i < item.package.length; i++) {
        tien_xuat_kho = tien_xuat_kho + Number(item.package[i].tien_can_tt) + Number(item.package[i].tien_dong_go) + Number(item.package[i].tien_chong_soc) + Number(item.package[i].phi_van_phat_sinh) + Number(item.package[i].tien_thanh_ly);
      }
      item.tien_xuat_kho = tien_xuat_kho;
      item.tien_thieu_xuat_kho = Number(item.debt) - Number(item.tien_xuat_kho);
    }
    item.show_tc = show;
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
