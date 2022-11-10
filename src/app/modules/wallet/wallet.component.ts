import {Component} from '@angular/core';
import {UserService} from '../../services/muser/user.service';
import {AuthService} from '../../auth.service';
import {Transaction, WithdrawalRequest} from '../../models/Transaction';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {WarehouseWait} from '../../models/Warehouse';
import {Subscription} from 'rxjs';
import {BankAccountService} from '../../services/bankAccount.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})

export class WalletComponent {
  modalRef: BsModalRef;
  transactions: Transaction[] = [];
  withdrawalRequests: WithdrawalRequest[] = [];
  withdrawalRequest: WithdrawalRequest;
  totalItems = 0;
  errorMessage: string[] = [];
  inputRutTien = {id: null, value: null, content: ''};
  inputNapTien = {id: null, n_value: null, bank_account_id: null};
  totalTransactions = 0;
  sub: Subscription;

  constructor(public userService: UserService,
              public bankAccountService: BankAccountService,
              public authService: AuthService, private modalService: BsModalService) {
    this.getTransactions();
    this.getWithdrawalRequest();
  }

  private getTransactions() {
    this.userService.getTransactions(1)
      .subscribe(transactions => {
        this.transactions = transactions.data.data;
        this.totalItems = transactions.data.total;
        this.genData();
      });
  }

  private genData() {
    this.totalTransactions = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].otype.value > 0) {
        console.log(this.transactions[i]);
        this.totalTransactions = this.totalTransactions + this.transactions[i].value;
      }
    }
  }

  private getWithdrawalRequest() {
    this.userService.getWithdrawalRequest()
      .subscribe(withdrawalRequests => {
        this.withdrawalRequests = withdrawalRequests.data.data;
      });
  }

  pageChanged(event: any): void {
    this.userService.tSearch.page = event.page;
    this.getTransactions();
  }

  public confirm(): void {
    this.errorMessage = [];
    this.userService.showLoading(true);
    this.userService.addWithdrawalRequest(this.inputRutTien)
      .subscribe(res => {
        if (res.status) {
          this.getWithdrawalRequest();
          this.inputRutTien = {id: null, value: null, content: ''};
          this.userService.showLoading(false);
          this.modalRef.hide();
        } else {
          // this.errorMessage.push(res.message);
          for (let i = 0; i < res.data.length; i++) {
            this.errorMessage.push(res.data[i]);
          }
          this.userService.showLoading(false);
        }
      });
  }

  public confirmHuy(): void {
    this.withdrawalRequest.is_deleted = 1;
    this.userService.editWithdrawalRequest(this.withdrawalRequest)
      .subscribe(res => {
        this.withdrawalRequest = null;
        this.getWithdrawalRequest();
        this.modalRef.hide();
      });
  }

  public huyRutTien(template, item) {
    this.withdrawalRequest = item;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm', ignoreBackdropClick: true});
  }

  public decline(): void {
    this.modalRef.hide();
  }

  public rutTien(template) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
  }

  public napTien(template) {
    this.bankAccountService.showLoading(true);
    this.bankAccountService.getVqrBanks()
      .subscribe(res => {
        this.bankAccountService.showLoading(false);
        this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
      });
  }
}
