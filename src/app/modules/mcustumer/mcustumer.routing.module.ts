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
    path: 'internal/edit/:id', component: InternalDetailComponent,
    data: {
      title: 'Chi tiết tài khoản'
    }
  },
  {
    path: 'sms', component: SmsComponent,
    data: {
      title: 'Tin nhắn'
    }
  },
  {
    path: 'sms/edit/:id', component: SmsDetailComponent,
    data: {
      title: 'Chi tiết tin nhắn'
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
