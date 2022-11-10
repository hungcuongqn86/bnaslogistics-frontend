import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {BankAccountService, BankAccount} from '../../../services/bankAccount.service';

@Component({
  selector: 'app-mcustumer-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SmsComponent implements OnInit {
  accounts: BankAccount[];
  total = 0;

  constructor(public bankAccountService: BankAccountService,
              private router: Router) {

  }

  ngOnInit() {
    this.getBank();
  }

  public editPartner(id) {
    this.router.navigate([`/mcustumer/internal/edit/${id}`]);
  }


  public getBank() {
    this.bankAccountService.showLoading(true);
    this.bankAccountService.getBankAccounts()
      .subscribe(accounts => {
        this.accounts = accounts.data;
        this.getTotal();
        this.bankAccountService.showLoading(false);
      });
  }

  private getTotal() {
    this.total = 0;
    for (let i = 0; i < this.accounts.length; i++) {
      this.total = this.total + this.accounts[i].bank_debt;
    }
  }
}
