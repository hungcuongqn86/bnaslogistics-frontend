import {Component, ViewEncapsulation, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../../auth.service';
import {WithdrawalRequest, WithdrawalRequestStatus} from "../../../models/Transaction";
import {UserService} from "../../../services/muser/user.service";

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class WithdrawalComponent {
  withdrawalRequests: WithdrawalRequest[] = [];
  withdrawalRequest: WithdrawalRequest;
  modalRef: BsModalRef;
  title = '';
  totalItems = 0;
  status: WithdrawalRequestStatus[] = [];
  counts: { status: number, total: number }[];

  constructor(public userService: UserService, public authService: AuthService, private modalService: BsModalService) {
    this.getStatus();
    this.getWithdrawalRequest();
  }

  public getWithdrawalRequest() {
    this.userService.getWithdrawalRequest()
      .subscribe(withdrawalRequests => {
        this.withdrawalRequests = withdrawalRequests.data.data;
      });
  }

  pageChanged(event: any): void {
    this.userService.withdrawalRequestSearch.page = event.page;
    this.getWithdrawalRequest();
  }

  selectTab(status: string = '0') {
    this.userService.withdrawalRequestSearch.status = status;
    this.getWithdrawalRequest();
  }

  public getStatus() {
    this.userService.showLoading(true);
    this.userService.getWithdrawalRequestStatus()
      .subscribe(res => {
        this.status = res.data;
        this.userService.showLoading(false);
      });
  }

  /*
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

    gotoOrder(orderId: number) {
      const win = window.open(`./order/list/detail/${orderId}`, '_blank');
      win.focus();
    }*/
}
