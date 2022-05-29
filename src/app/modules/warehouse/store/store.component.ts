import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../auth.service';
import {PackageService} from '../../../services/package/package.service';
import {IPackage} from '../../../models/interface';

@Component({
  selector: 'app-warehouse-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class StoreComponent implements OnInit, OnDestroy {
  package_code: string;
  packages: IPackage[] = [];
  errorMessage: string[] = [];
  sub: Subscription;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, public authService: AuthService,
              public packageService: PackageService,
              private router: Router) {
  }

  ngOnInit() {

  }

  private getPackage() {
    this.packageService.showLoading(true);
    if (this.package_code) {
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

  private addPackage(item: IPackage) {
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
