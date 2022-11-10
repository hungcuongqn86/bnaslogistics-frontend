import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {UserService} from '../../services/muser/user.service';
import {PartnerService} from '../../services/mpartner/partner.service';
import {BankAccountService} from '../../services/bankAccount.service';
import {SettingService} from '../../services/setting/setting.service';

import {CustumerComponent} from './custumer/custumer.component';
import {CustumerDetailComponent} from './custumer/custumer.detail.component';
import {InfoComponent} from './custumer/info/info.component';
import {TransactionComponent} from './custumer/transaction/transaction.component';

import {InternalComponent} from './internal/internal.component';
import {InternalDetailComponent} from './internal/internal.detail.component';
import {ItransactionComponent} from './internal/itransaction/itransaction.component';
import {IinfoComponent} from './internal/info/iinfo.component';
import {WithdrawalComponent} from './withdrawal/withdrawal.component';

import {SmsComponent} from './sms/sms.component';
import {SmsDetailComponent} from './sms/sms.detail.component';

import {McustumerRoutingModule} from './mcustumer.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, McustumerRoutingModule, SharedModule, CollapseModule.forRoot()],
  declarations: [
    CustumerComponent,
    CustumerDetailComponent,
    InfoComponent,
    TransactionComponent,
    InternalComponent,
    IinfoComponent,
    InternalDetailComponent,
    ItransactionComponent,
    SmsComponent,
    SmsDetailComponent,
    WithdrawalComponent
  ],
  exports: [],
  providers: [UserService, PartnerService, BankAccountService, SettingService]
})
export class McustumerModule {
}
