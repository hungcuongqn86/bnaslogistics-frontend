import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {IBankSms} from '../../../models/interface';
import {BankSmsService} from '../../../services/bankSms.service';

@Component({
  selector: 'app-mcustumer-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SmsComponent implements OnInit {
  bankSmss: IBankSms[] = [];
  totalItems = 0;

  constructor(public bankSmsService: BankSmsService,
              private router: Router) {

  }

  ngOnInit() {
    this.getBank();
  }

  pageChanged(event: any): void {
    this.bankSmsService.search.page = event.page;
    this.getBank();
  }

  public getBank() {
    this.bankSmsService.showLoading(true);
    this.bankSmsService.getBankSmss()
      .subscribe(bankSmss => {
        if (bankSmss.status) {
          this.bankSmss = bankSmss.data.data;
          this.totalItems = bankSmss.data.total;
        }
        this.bankSmsService.showLoading(false);
      });
  }
}
