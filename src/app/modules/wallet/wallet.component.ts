import {Component} from '@angular/core';
import {UserService} from '../../services/muser/user.service';
import {AuthService} from '../../auth.service';
import {Transaction, WithdrawalRequest} from '../../models/Transaction';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {WarehouseWait} from '../../models/Warehouse';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {BankAccount, BankAccountService} from '../../services/bankAccount.service';
import {ITransactionRequest, IVqrBank} from '../../models/interface';

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
  inputNapTien = {id: null, n_value: null, vqrSelBank: null};
  totalTransactions = 0;
  sub: Subscription;
  accounts: BankAccount[] = [];
  vqrBanks: IVqrBank[] = [];
  vqrSmsBanks: IVqrBank[] = [];
  transactionRequest: ITransactionRequest;

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
    this.vqrSmsBanks = [];
    this.bankAccountService.showLoading(true);
    const getVqrBanks: Observable<any> = this.bankAccountService.getVqrBanks();
    const getBankAccounts: Observable<any> = this.bankAccountService.getBankAccounts();
    const listSub = forkJoin([
      getVqrBanks,
      getBankAccounts
    ]).subscribe(([vqrBanks, bankaccounts]) => {
      this.accounts = bankaccounts.data;
      this.vqrBanks = vqrBanks.data;
      this.vqrBanks.forEach(element => {
        for (let i = 0; i < this.accounts.length; i++) {
          if (this.accounts[i].is_sms && (this.accounts[i].bin === element.code)) {
            element.account = this.accounts[i];
            this.vqrSmsBanks.push(element);
            break;
          }
        }
      });
      this.bankAccountService.showLoading(false);
      this.transactionRequest = null;
      this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
      listSub.unsubscribe();
    });
  }

  public selBank(item: IVqrBank) {
    this.inputNapTien.vqrSelBank = item;
  }

  public napConfirm(): void {
    this.errorMessage = [];
    this.bankAccountService.showLoading(true);
    this.bankAccountService.recharge(this.inputNapTien)
      .subscribe(res => {
        if (res.status) {
          this.transactionRequest = res.data;
          this.inputNapTien = {id: null, n_value: null, vqrSelBank: null};
          this.bankAccountService.showLoading(false);
        } else {
          for (let i = 0; i < res.data.length; i++) {
            this.errorMessage.push(res.data[i]);
          }
          this.bankAccountService.showLoading(false);
        }
      });
  }
}
