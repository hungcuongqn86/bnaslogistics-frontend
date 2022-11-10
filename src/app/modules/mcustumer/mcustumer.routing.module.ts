import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CustumerComponent} from './custumer/custumer.component';
import {CustumerDetailComponent} from './custumer/custumer.detail.component';
import {InternalComponent} from './internal/internal.component';
import {InternalDetailComponent} from './internal/internal.detail.component';
import {WithdrawalComponent} from './withdrawal/withdrawal.component';
import {SmsComponent} from './sms/sms.component';
import {SmsDetailComponent} from './sms/sms.detail.component';

const routes: Routes = [
  {
    path: 'custumer', component: CustumerComponent,
    data: {
      title: 'Khách hàng'
    }
  },
  {
    path: 'custumer/edit/:id', component: CustumerDetailComponent,
    data: {
      title: 'Thông tin khách hàng'
    }
  },
  {
    path: 'internal', component: InternalComponent,
    data: {
      title: 'Tài khoản nội bộ'
    }
  },
  {
    path: 'sms', component: SmsComponent,
    data: {
      title: 'Tin nhắn'
    }
  },
  {
    path: 'internal/edit/:id', component: InternalDetailComponent,
    data: {
      title: 'Lịch sử giao dịch'
    }
  },
  {
    path: 'withdrawal', component: WithdrawalComponent,
    data: {
      title: 'Yêu cầu rút tiền'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule]
})

export class McustumerRoutingModule {
  constructor() {
  }
}
