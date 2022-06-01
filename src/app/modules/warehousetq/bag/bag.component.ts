import {Component, OnDestroy, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {WarehouseService} from '../../../services/order/warehouse.service';
import {AuthService} from '../../../auth.service';
import {IBag} from '../../../models/interface';
import {Bag, Package} from '../../../models/model';

@Component({
  selector: 'app-warehousetq-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BagComponent implements OnInit, OnDestroy {
  bags: IBag[];
  bag: IBag;
  totalItems = 0;
  errorMessage: string[] = [];
  sub: Subscription;
  modalRef: BsModalRef;

  barcodeVal = '';

  col = '';

  constructor(public warehouseService: WarehouseService, private route: ActivatedRoute, public authService: AuthService,
              private router: Router, private modalService: BsModalService) {
    this.reNewBag();
  }

  ngOnInit() {
    this.searchBags();
  }

  public selectBag(item: IBag, col: string) {
    this.col = col;
    this.bag = item;
  }

  public hideInput() {
    this.reNewBag();
  }

  private reNewBag() {
    this.bag = new Bag();
  }

  public updateBag(template: TemplateRef<any>, dirty: string) {
    /*this.packageService.showLoading(true);
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
      });*/
  }

  pageChanged(event: any): void {
    this.warehouseService.receiptSearch.page = event.page;
    this.searchBags();
  }

  public searchBags() {
    this.warehouseService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.warehouseService.getBags()
      .subscribe(data => {
        this.bags = data.data.data;
        this.totalItems = data.data.total;
        this.warehouseService.showLoading(false);
      });
  }

  public editBag(id) {
    this.router.navigate([`/warehouse-tq/bag/detail/${id}`]);
  }

  gotoOrder(orderId: number) {
    const win = window.open(`./order/list/detail/${orderId}`, '_blank');
    win.focus();
  }

  printBarcode(template: TemplateRef<any>, item: IBag) {
    this.barcodeVal = item.code;
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
