import {Component, OnDestroy, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../auth.service';
import {PackageService} from '../../../services/package/package.service';
import {WarehouseService} from '../../../services/order/warehouse.service';
import {IPackage} from '../../../models/interface';

@Component({
  selector: 'app-warehousetq-createbag',
  templateUrl: './createbag.component.html',
  styleUrls: ['./createbag.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CreatebagComponent implements OnInit, OnDestroy {
  package_code: string;
  packages: IPackage[] = [];
  errorMessage: string[] = [];
  sub: Subscription;
  modalRef: BsModalRef;
  note_tq = '';
  dvvc = '';

  package_filter_key: string;
  packagesSearch: IPackage[] = [];

  constructor(private modalService: BsModalService, public authService: AuthService,
              public packageService: PackageService,
              private warehouseService: WarehouseService,
              private router: Router) {
  }

  ngOnInit() {

  }

  public packageFilter(template: TemplateRef<any>) {
    this.package_filter_key = '';
    this.packagesSearch = null;
    this.modalRef = this.modalService.show(template, {class: 'modal-xl', ignoreBackdropClick: false});
  }

  public btnPackageSearch() {
    if (this.package_filter_key) {
      this.packageService.showLoading(true);
      this.sub = this.packageService.packageSearch(this.package_filter_key, 'kho_tq_tao_bao_hang')
        .subscribe(res => {
          if (res.status) {
            this.packagesSearch = res.data;
          }
          this.packageService.showLoading(false);
          this.sub.unsubscribe();
        });
    }
  }

  public selectPackage(item: IPackage) {
    this.addPackage(item);
  }

  public getPackage() {
    if (this.package_code) {
      this.packageService.showLoading(true);
      this.sub = this.packageService.getPackageByCode(this.package_code)
        .subscribe(res => {
          if (res.status) {
            if (res.data) {
              this.addPackage(res.data);
              this.package_code = '';
            }
          }
          this.packageService.showLoading(false);
          this.sub.unsubscribe();
        });
    }
  }

  public createStoreBill(status: number) {
    if (this.packages.length) {
      this.errorMessage = [];
      this.warehouseService.showLoading(true);
      const pkidlist = [];
      for (let i = 0; i < this.packages.length; i++) {
        pkidlist.push(this.packages[i].id);
      }

      this.sub = this.warehouseService.bagCreate(pkidlist, this.note_tq, this.dvvc, status)
        .subscribe(res => {
          this.warehouseService.showLoading(false);
          this.sub.unsubscribe();
          if (res.status) {
            this.router.navigate([`/warehouse-tq/bag/detail/${res.data.id}`]);
          } else {
            this.errorMessage = res.data;
          }
        });
    }
  }

  public addPackage(item: IPackage) {
    let found = false;
    for (const element of this.packages) {
      if (element.id === item.id) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.packages.push(item);
    }
  }

  public removePackage(item: IPackage) {
    const index = this.packages.indexOf(item);
    if (index !== -1) {
      this.packages.splice(index, 1);
    }
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
