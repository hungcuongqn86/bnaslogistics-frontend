import {Component} from '@angular/core';
import {UserService} from '../../../../services/muser/user.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {TransactionType, Transaction} from '../../../../models/Transaction';
import {BankAccountService, BankAccount} from '../../../../services/bankAccount.service';
import {AuthService} from '../../../../auth.service';

@Component({
  selector: 'app-mcustumer-custumer-detail-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent {
  modalRef: BsModalRef;
  types: TransactionType[];
  accounts: BankAccount[];
  transactions: Transaction[];
  totalItems = 0;

  constructor(public userService: UserService, private modalService: BsModalService,
              public authService: AuthService, public bankAccountService: BankAccountService) {
    this.userService.tSearch = {limit: 20, page: 1};
    this.transactions = [];
    this.getTypes();
    this.getTransactions();
    this.getBank();
  }

  private getTransactions() {
    this.userService.showLoading(true);
    this.transactions = [];
    this.userService.getTransactions(this.userService.user.id)
      .subscribe(transactions => {
        this.transactions = transactions.data.data;
        this.totalItems = transactions.data.total;
        this.userService.showLoading(false);
      });
  }

  pageChanged(event: any): void {
    this.userService.tSearch.page = event.page;
    this.getTransactions();
  }

  private getTypes() {
    this.userService.getTransactionTypes()
      .subscribe(types => {
        this.types = types.data;
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

  public confirm(): void {
    this.userService.addTransaction()
      .subscribe(transaction => {
        this.modalRef.hide();
        this.getTransactions();
        this.userService.transaction = {
          id: null, user_id: null, code: null, content: null, type: null, value: null, otype: null,
          debt: null, is_deleted: 0, created_at: '', updated_at: '', bank_account: null, bank_debt: null, user: null
        };
      });
  }

  public decline(): void {
    this.modalRef.hide();
  }

  public addTransaction(template) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
  }
}
