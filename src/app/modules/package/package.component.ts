import {Component, OnInit, ViewEncapsulation, TemplateRef, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PackageService} from '../../services/package/package.service';
import {IPackage, PackageStatus} from '../../models/interface';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth.service';
import {Package} from "../../models/model";

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PackageComponent implements OnInit, OnDestroy {
  packages: IPackage[];
  package: IPackage;
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

  public selectTab(status: string = null) {
    this.packageService.search.status = status;
    this.searchPackages();
  }

  public editPackages(id) {
    this.router.navigate([`/package/detail/${id}`]);
  }

  gotoOrder(orderId: number) {
    const win = window.open(`./order/list/detail/${orderId}`, '_blank');
    win.focus();
  }

  gotoBill(billId: number) {
    const win = window.open(`./warehouse/bill/detail/${billId}`, '_blank');
    win.focus();
  }

  public selectPackage(item: IPackage, col: string) {
    this.col = col;
    this.package = item;
  }

  public hideInput() {
    this.reNewPackage();
  }

  reNewPackage() {
    this.package = new Package();
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
