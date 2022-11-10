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
  bankSmss: IBankSms[];
  total = 0;

  constructor(public bankSmsService: BankSmsService,
              private router: Router) {

  }

  ngOnInit() {
    this.getBank();
  }

  public getBank() {
    this.bankSmsService.showLoading(true);
    this.bankSmsService.getBankSmss()
      .subscribe(bankSmss => {
        this.bankSmss = bankSmss.data;
        this.bankSmsService.showLoading(false);
      });
  }
}
