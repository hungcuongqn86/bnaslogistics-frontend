import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StoreComponent} from './store/store.component';
import {InventoryComponent} from './inventory/inventory.component';
import {ReceiptComponent} from './receipt/receipt.component';
import {BagComponent} from './bag/bag.component';
import {CreatebagComponent} from './bag/createbag.component';

const routes: Routes = [
  {
    path: 'store', component: StoreComponent,
    data: {
      title: 'Nhập kho'
    }
  },
  {
    path: 'inventory', component: InventoryComponent,
    data: {
      title: 'Kiện hàng'
    }
  },
  {
    path: 'receipt', component: ReceiptComponent,
    data: {
      title: 'Phiếu nhập'
    }
  },
  {
    path: 'bag', component: BagComponent,
    data: {
      title: 'Bao hàng'
    }
  },
  {
    path: 'bag/create', component: CreatebagComponent,
    data: {
      title: 'Tạo bao hàng'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule]
})

export class WarehousetqRoutingModule {
  constructor() {
  }
}
