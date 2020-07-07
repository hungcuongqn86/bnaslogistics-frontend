import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BankAccountService} from '../../../services/bankAccount.service';

@Component({
    selector: 'app-mcustumer-internal-detail',
    templateUrl: './internal.detail.component.html',
    styleUrls: ['./internal.detail.component.css']
})

export class InternalDetailComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute
        , public bankAccountService: BankAccountService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.bankAccountService.account.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.bankAccountService.account.id !== null) {
            this.bankAccountService.getBankAccount(this.bankAccountService.account.id)
                .subscribe(account => {
                    this.bankAccountService.account = account.data.bank_account;
                });
        } else {
            this.bankAccountService.reset();
        }
    }

    public backlist() {
        this.router.navigate(['/mcustumer/internal']);
    }
}
