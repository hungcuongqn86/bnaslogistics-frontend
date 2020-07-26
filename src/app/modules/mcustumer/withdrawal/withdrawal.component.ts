import {Component, ViewEncapsulation, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../../auth.service';
import {WithdrawalRequest, WithdrawalRequestStatus} from "../../../models/Transaction";
import {UserService} from "../../../services/muser/user.service";
import {BankAccount, BankAccountService} from "../../../services/bankAccount.service";

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
  accounts: BankAccount[];

  errorMessage: string[] = [];

  constructor(public userService: UserService, public authService: AuthService,
              public bankAccountService: BankAccountService,
              private modalService: BsModalService) {
    this.getStatus();
    this.getBank();
    this.getWithdrawalRequest();
  }

  public getWithdrawalRequest() {
    this.userService.showLoading(true);
    this.userService.getWithdrawalRequest()
      .subscribe(withdrawalRequests => {
        this.withdrawalRequests = withdrawalRequests.data.data;
        this.totalItems = withdrawalRequests.data.total;
        this.getCountByStatus();
        this.userService.showLoading(false);
      });
  }

  public getCountByStatus() {
    this.userService.showLoading(true);
    this.userService.getWithdrawalRequestCountByStatus()
      .subscribe(data => {
        this.counts = data.data;
        this.userService.showLoading(false);
      });
  }

  public getBank() {
    this.bankAccountService.showLoading(true);
    this.bankAccountService.getBankAccounts()
      .subscribe(accounts => {
        this.accounts = accounts.data;
        this.bankAccountService.showLoading(false);
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

  public openModalApprove(template: TemplateRef<any>, withdrawalRequest: WithdrawalRequest) {
    this.withdrawalRequest = withdrawalRequest;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


  public confirmApprove(): void {
    if (this.withdrawalRequest) {
      this.withdrawalRequest.status = 2;
      this.userService.approveWithdrawalRequest(this.withdrawalRequest)
        .subscribe(res => {
          this.modalRef.hide();
          this.getWithdrawalRequest();
        });
    }
  }

  public decline(): void {
    this.modalRef.hide();
  }

  public openModalReject(template: TemplateRef<any>, withdrawalRequest: WithdrawalRequest) {
    this.withdrawalRequest = withdrawalRequest;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public reject() {
    if (this.withdrawalRequest) {
      this.withdrawalRequest.status = 3;
      this.userService.approveWithdrawalRequest(this.withdrawalRequest)
        .subscribe(res => {
          if (res.status) {
            this.modalRef.hide();
            this.getWithdrawalRequest();
          } else {
            for (let i = 0; i < res.data.length; i++) {
              this.errorMessage.push(res.data[i]);
            }
            this.userService.showLoading(false);
          }
        });
    }
  }
}
