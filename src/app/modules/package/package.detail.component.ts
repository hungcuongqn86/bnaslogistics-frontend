import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PackageService} from '../../services/package/package.service';
import {IPackage, PackageStatus} from '../../models/interface';
import {Package} from '../../models/model';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package.detail.component.html',
  styleUrls: ['./package.detail.component.css']
})

export class PackageDetailComponent implements OnInit {
  package: IPackage;
  pkStatus: PackageStatus[];

  constructor(private router: Router, private route: ActivatedRoute
    , public packageService: PackageService) {
    this.reNewPackage();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.package.id = params['id'];
        this.getPackage();
      }
    });
  }

  ngOnInit() {
    this.getPkStatus();
  }

  private reNewPackage() {
    this.package = new Package();
  }

  private getPackage() {
    if (this.package.id !== null) {
      this.packageService.getPackage(this.package.id)
        .subscribe(res => {
          this.package = res.data;
        });
    }
  }

  public getPkStatus() {
    this.packageService.showLoading(true);
    this.packageService.getPkStatus()
      .subscribe(pks => {
        this.pkStatus = pks.data;
        this.packageService.showLoading(false);
      });
  }

  public gotoOrder(orderId: number) {
    const win = window.open(`./order/list/detail/${orderId}`, '_blank');
    win.focus();
  }

  public backlist() {
    this.router.navigate(['/package']);
  }
}
