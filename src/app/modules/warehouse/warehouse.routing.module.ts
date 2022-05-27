import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WaitComponent} from './wait/wait.component';
import {StoreComponent} from './store/store.component';
import {BillComponent} from './bill/bill.component';
import {BillDetailComponent} from './bill/bill.detail.component';

const routes: Routes = [
  {
    path: 'wait', component: WaitComponent,
    data: {
      title: 'Chờ xuất kho'
    }
  }, {
    path: 'store', component: StoreComponent,
    data: {
      title: 'Nhập kho'
    }
  },
  {
    path: 'bill', component: BillComponent,
    data: {
      title: 'Phiếu xuất'
    }
  },
  {
    path: 'bill/detail/:id', component: BillDetailComponent,
    data: {
      title: 'Phiếu xuất kho'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule]
})

export class WarehouseRoutingModule {
  constructor() {
  }
}
