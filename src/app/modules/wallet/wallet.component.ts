import {Component} from '@angular/core';
import {UserService} from '../../services/muser/user.service';
import {AuthService} from '../../auth.service';
import {Transaction} from '../../models/Transaction';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})

export class WalletComponent {
  modalRef: BsModalRef;
  transactions: Transaction[];
  totalItems = 0;

  inputRutTien = {id: null, value: null, content: ''};

  constructor(public userService: UserService, public authService: AuthService, private modalService: BsModalService) {
    this.getTransactions();
  }

  private getTransactions() {
    this.userService.getTransactions(this.authService.user.id)
      .subscribe(transactions => {
        this.transactions = transactions.data.data;
        this.totalItems = transactions.data.total;
      });
  }

  pageChanged(event: any): void {
    this.userService.tSearch.page = event.page;
    this.getTransactions();
  }

  public confirm(): void {
    this.userService.addWithdrawalRequest(this.inputRutTien)
      .subscribe(res => {
        this.modalRef.hide();
        // this.getTransactions();
        this.inputRutTien = {id: null, value: null, content: ''};
      });
  }

  public decline(): void {
    this.modalRef.hide();
  }

  public rutTien(template) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
  }
}
