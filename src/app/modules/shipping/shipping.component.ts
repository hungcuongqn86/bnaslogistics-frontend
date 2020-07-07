import { Component, ViewEncapsulation, TemplateRef} from '@angular/core';
import { ShippingService} from '../../services/shipping/shipping.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Shipping, ShippingStatus } from '../../models/Shipping';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ShippingComponent {
  shippings: Shipping[] = [];
  modalRef: BsModalRef;
  title = '';
  totalItems = 0;
  status: ShippingStatus[] = [];
  counts: { status: number, total: number }[];

  constructor(public shippingService: ShippingService, public authService: AuthService, private modalService: BsModalService) {
    this.getStatus();
    this.getShippings();
  }

  public getShippings() {
    this.shippingService.showLoading(true);
    this.shippingService.getShippings()
          .subscribe(shippings => {
            this.shippings = shippings.data.data;
            this.totalItems = shippings.data.total;
            this.getCountByStatus();
            this.shippingService.showLoading(false);
          });
  }

  pageChanged(event: any): void {
    this.shippingService.search.page = event.page;
    this.getShippings();
  }

  public addShipping(template) {
    this.title = 'Thêm mới yêu cầu ký gửi';
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', ignoreBackdropClick: true });
  }

  public editShipping(id: number, template) {
    this.title = 'Chi tiết yêu cầu ký gửi';
    this.shippingService.getShipping(id)
    .subscribe(res => {
      this.shippingService.shipping = res.data.shipping;
      this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
    });
  }

  public confirm() {
    this.shippingService.showLoading(true);
    if (this.shippingService.shipping.id === null) {
      this.shippingService.addShipping(this.shippingService.shipping).subscribe(
        res => {
          this.modalRef.hide();
          this.getShippings();
        }
      );
    } else {
      this.shippingService.editShipping(this.shippingService.shipping).subscribe(
        res => {
          this.modalRef.hide();
          this.getShippings();
        }
      );
    }
  }

  public decline(): void {
      this.modalRef.hide();
  }

  public openModalReject(template: TemplateRef<any>, shipping: Shipping) {
    this.shippingService.shipping = shipping;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public openModalApprove(template: TemplateRef<any>, shipping: Shipping) {
    this.shippingService.shipping = shipping;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public confirmApprove(): void {
    this.approve();
    this.modalRef.hide();
  }

  private approve() {
    if (this.shippingService.shipping) {
      this.shippingService.shipping.status = 2;
      this.shippingService.approveShipping(this.shippingService.shipping)
        .subscribe(res => {
          this.getShippings();
        });
    }
  }

  public confirmReject(): void {
    this.reject();
    this.modalRef.hide();
  }

  private reject() {
    if (this.shippingService.shipping) {
      this.shippingService.shipping.status = 3;
      this.shippingService.approveShipping(this.shippingService.shipping)
        .subscribe(res => {
          this.getShippings();
        });
    }
  }

  public getStatus() {
    this.shippingService.showLoading(true);
    this.shippingService.getStatus()
      .subscribe(res => {
        this.status = res.data;
        this.shippingService.showLoading(false);
      });
  }

  public getCountByStatus() {
    this.shippingService.showLoading(true);
    this.shippingService.getCountByStatus()
      .subscribe(data => {
        this.counts = data.data;
        this.shippingService.showLoading(false);
      });
  }

  selectTab(status: string = '0') {
    this.shippingService.search.status = status;
    this.getShippings();
  }

  gotoOrder(orderId: number) {
    const win = window.open(`./order/list/detail/${orderId}`, '_blank');
    win.focus();
  }

  ngOnDestroy() {
    /*if (this.sub) {
      this.sub.unsubscribe();
    }*/
  }
}
