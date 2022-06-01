import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../auth.service';
import {PackageService} from '../../../services/package/package.service';
import {WarehouseService} from '../../../services/order/warehouse.service';
import {IBag, IPackage} from '../../../models/interface';
import {Bag} from '../../../models/model';

@Component({
  selector: 'app-warehousetq-bag-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DetailComponent implements OnInit, OnDestroy {
  bag: IBag;
  package_code: string;
  errorMessage: string[] = [];
  sub: Subscription;
  modalRef: BsModalRef;
  note_tq = '';
  dvvc = '';

  constructor(private modalService: BsModalService, public authService: AuthService,
              private route: ActivatedRoute,
              public packageService: PackageService,
              private warehouseService: WarehouseService,
              private router: Router) {
    this.reNewBag();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.bag.id = params['id'];
        this.getBag();
      }
    });
  }

  ngOnInit() {

  }

  private reNewBag() {
    this.bag = new Bag();
  }

  private getBag() {
    if (this.bag.id !== null) {
      this.warehouseService.showLoading(true);
      this.sub = this.warehouseService.getBag(this.bag.id)
        .subscribe(bag => {
          this.bag = bag.data;
          this.warehouseService.showLoading(false);
          this.sub.unsubscribe();
        });
    }
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

  public addPackage(item: IPackage) {
    let found = false;
    for (const element of this.bag.package) {
      if (element.id === item.id) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.bag.package.push(item);
    }
    this.updateBag('package');
  }

  public removePackage(item: IPackage) {
    const index = this.bag.package.indexOf(item);
    if (index !== -1) {
      this.bag.package.splice(index, 1);
    }
    this.updateBag('package');
  }

  public updateBag(dirty: string) {
    this.warehouseService.showLoading(true);
    const updatesub = this.warehouseService.updateBag(this.bag, dirty)
      .subscribe(res => {
        if (res.status) {
          this.getBag();
        } else {
          this.errorMessage = res.data;
        }
        this.warehouseService.showLoading(false);
        updatesub.unsubscribe();
      });
  }

  public updateStatus(status: number) {
    this.bag.status = status;
    this.updateBag('status');
  }

  public deleteBag() {

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
