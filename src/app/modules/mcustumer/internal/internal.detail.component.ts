import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BankAccountService} from '../../../services/bankAccount.service';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-mcustumer-internal-detail',
  templateUrl: './internal.detail.component.html',
  styleUrls: ['./internal.detail.component.css']
})

export class InternalDetailComponent implements OnInit {
  errorMessage: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute,
              public authService: AuthService
    , public bankAccountService: BankAccountService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.bankAccountService.account.id = params['id'];
      }
    });
  }

  ngOnInit() {
    if (this.bankAccountService.account.id !== null) {
      this.getBankAccount();
    } else {
      this.bankAccountService.reset();
    }
  }

  public getBankAccount() {
    this.bankAccountService.getBankAccount(this.bankAccountService.account.id)
      .subscribe(account => {
        this.bankAccountService.account = account.data.bank_account;
      });
  }

  public saveBank(): void {
    this.errorMessage = [];
    if (this.bankAccountService.account.id !== null) {
      this.bankAccountService.showLoading(true);
      this.bankAccountService.updateBank(this.bankAccountService.account)
        .subscribe(bank => {
          if (bank.status) {
            this.getBankAccount();
          } else {
            this.errorMessage = bank.data;
          }
          this.bankAccountService.showLoading(false);
        });
    }
  }

  public backlist() {
    this.router.navigate(['/mcustumer/internal']);
  }
}
