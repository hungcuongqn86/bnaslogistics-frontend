import {Component, OnInit, ViewEncapsulation, TemplateRef, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PackageService} from '../../services/package/package.service';
import {Package, PackageStatus} from '../../models/Package';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PackageComponent implements OnInit, OnDestroy {
  packages: Package[];
  package: Package;
  col: string;
  pkStatus: PackageStatus[];
  totalItems = 0;
  errorMessage: string[] = [];
  counts: { status: number, total: number }[];
  sub: Subscription;

  constructor(public packageService: PackageService, private route: ActivatedRoute, public authService: AuthService,
              private router: Router) {
    this.route.params.subscribe(params => {
      if (params['package_code']) {
        this.packageService.search.package_code = params['package_code'];
      }
    });
    this.counts = null;
    this.reNewPackage();
  }

  ngOnInit() {
    this.searchPackages();
    this.getPkStatus();
  }

  pageChanged(event: any): void {
    this.packageService.search.page = event.page;
    this.searchPackages();
  }

  public searchPackages() {
    this.packageService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.packageService.getPackages()
      .subscribe(data => {
        this.packages = data.data.data;
        this.totalItems = data.data.total;
        this.packageService.showLoading(false);
      });
  }

  public getPkStatus() {
    this.packageService.showLoading(true);
    this.packageService.getPkStatus()
      .subscribe(pks => {
        this.pkStatus = pks.data;
        this.packageService.showLoading(false);
      });
  }

  selectTab(status: string = null) {
    this.packageService.search.status = status;
    this.searchPackages();
  }

  gotoOrder(orderId: number) {
    const win = window.open(`./order/list/detail/${orderId}`, '_blank');
    win.focus();
  }

  gotoBill(billId: number) {
    const win = window.open(`./warehouse/bill/detail/${billId}`, '_blank');
    win.focus();
  }

  public selectPackage(item: Package, col: string) {
    this.col = col;
    this.package = item;
  }

  public hideInput() {
    this.reNewPackage();
  }

  reNewPackage() {
    this.package = {
      id: null,
      is_deleted: null,
      contract_code: null,
      ship_khach: null,
      ship_tt: null,
      tra_shop: null,
      thanh_toan: null,
      created_at: null,
      order_id: null,
      order: null,
      package_code: null,
      status: null,
      note_tl: null,
      weight: null,
      weight_qd: null,
      tien_can: null,
      gia_can: null,
      tien_thanh_ly: null,
      phi_van_phat_sinh: null,
      updated_at: null,
      bill_id: null
    };
  }

  public updatePackage() {
    this.packageService.showLoading(true);
    if (!this.package.weight_qd) {
      if (this.package.weight < 0.5) {
        this.package.weight_qd = 0.5;
      } else {
        this.package.weight_qd = this.package.weight;
      }
    }
    this.packageService.editPackage(this.package)
      .subscribe(res => {
        this.searchPackages();
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
