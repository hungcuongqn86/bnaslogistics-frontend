import {Component, OnDestroy, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {WarehouseService} from '../../../services/order/warehouse.service';
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

  constructor(public warehouseService: WarehouseService, private route: ActivatedRoute, public authService: AuthService,
              private router: Router, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.searchReceipts();
  }

  pageChanged(event: any): void {
    this.warehouseService.receiptSearch.page = event.page;
    this.searchReceipts();
  }

  public searchReceipts() {
    this.warehouseService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.warehouseService.geTqReceipts()
      .subscribe(data => {
        this.receipts = data.data.data;
        this.totalItems = data.data.total;
        this.warehouseService.showLoading(false);
      });
  }

  gotoOrder(orderId: number) {
    const win = window.open(`./order/list/detail/${orderId}`, '_blank');
    win.focus();
  }

  deleteModalOpen(template: TemplateRef<any>, item: IReceipt) {
    this.receipt = item;
    this.errorMessage = [];
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirmDelete(): void {
    if (this.receipt) {
      this.errorMessage = [];
      this.warehouseService.deleteReceipts(this.receipt.id)
        .subscribe(res => {
          if (res.status) {
            this.errorMessage = [];
            this.searchReceipts();
            this.modalRef.hide();
          } else {
            for (let i = 0; i < res.data.length; i++) {
              this.errorMessage.push(res.data[i]);
            }
          }
        });
    }
  }

  public declineModal(): void {
    this.modalRef.hide();
    this.errorMessage = [];
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
