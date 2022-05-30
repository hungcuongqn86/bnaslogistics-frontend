import {Component, OnDestroy, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PackageService} from '../../../services/package/package.service';
import {AuthService} from '../../../auth.service';
import {IPackage, PackageStatus} from '../../../models/interface';
import {Package} from '../../../models/model';

@Component({
  selector: 'app-warehouse-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class InventoryComponent implements OnInit, OnDestroy {
  packages: IPackage[];
  package: IPackage;
  col: string;
  pkStatus: PackageStatus[];
  totalItems = 0;
  errorMessage: string[] = [];
  counts: { status: number, total: number }[];
  sub: Subscription;
  barcodeVal = '';

  modalRef: BsModalRef;

  constructor(public packageService: PackageService, private route: ActivatedRoute, public authService: AuthService,
              private router: Router, private modalService: BsModalService) {
    this.packageService.search.status = '6';
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

  private reNewPackage() {
    this.package = new Package();
  }

  public updatePackage(template: TemplateRef<any>, dirty: string) {
    this.packageService.showLoading(true);
    if (!this.package.weight_qd) {
      if (this.package.weight < 0.5) {
        this.package.weight_qd = 0.5;
      } else {
        this.package.weight_qd = this.package.weight;
      }
    }
    const updatesub = this.packageService.editPackage(this.package, dirty)
      .subscribe(res => {
        if (res.status) {
          this.searchPackages();
        } else {
          this.errorMessage = res.data;
          this.openErrorModal(template);
          this.searchPackages();
        }
        updatesub.unsubscribe();
      });
  }

  printBarcode(template: TemplateRef<any>, code: string) {
    this.barcodeVal = code;
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
    setTimeout(() => {
      this.print();
    }, 1000);
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
          <head>
            <title>Print tab</title>
            <style>
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`
    );
    popupWin.document.close();
  }

  openErrorModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  declineError(): void {
    this.modalRef.hide();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
