import {Component, OnDestroy, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PackageService} from '../../../services/package/package.service';
import {AuthService} from '../../../auth.service';
import {IReceipt} from '../../../models/interface';

@Component({
  selector: 'app-warehouse-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ReceiptComponent implements OnInit, OnDestroy {
  receipts: IReceipt[];
  receipt: IReceipt;
  totalItems = 0;
  errorMessage: string[] = [];
  sub: Subscription;
  modalRef: BsModalRef;

  constructor(public packageService: PackageService, private route: ActivatedRoute, public authService: AuthService,
              private router: Router, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.searchReceipts();
  }

  pageChanged(event: any): void {
    this.packageService.search.page = event.page;
    this.searchReceipts();
  }

  public searchReceipts() {
    this.packageService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.packageService.getPackages()
      .subscribe(data => {
        this.receipts = data.data.data;
        this.totalItems = data.data.total;
        this.packageService.showLoading(false);
      });
  }

  gotoOrder(orderId: number) {
    const win = window.open(`./order/list/detail/${orderId}`, '_blank');
    win.focus();
  }

  printBarcode(template: TemplateRef<any>, item: IReceipt) {

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
