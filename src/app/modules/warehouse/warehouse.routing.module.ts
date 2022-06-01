import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WaitComponent} from './wait/wait.component';
import {StoreComponent} from './store/store.component';
import {BillComponent} from './bill/bill.component';
import {BillDetailComponent} from './bill/bill.detail.component';
import {InventoryComponent} from './inventory/inventory.component';
import {ReceiptComponent} from './receipt/receipt.component';
import {BagComponent} from './bag/bag.component';
import {DetailComponent} from './bag/detail.component';

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
  },
  {
    path: 'inventory', component: InventoryComponent,
    data: {
      title: 'Kiện hàng'
    }
  },
  {
    path: 'bag', component: BagComponent,
    data: {
      title: 'Bao hàng'
    }
  },
  {
    path: 'bag/detail/:id', component: DetailComponent,
    data: {
      title: 'Chi tiết bao hàng'
    }
  },
  {
    path: 'receipt', component: ReceiptComponent,
    data: {
      title: 'Phiếu nhập'
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
