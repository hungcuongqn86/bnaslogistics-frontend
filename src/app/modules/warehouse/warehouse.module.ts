import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {OrderService} from '../../services/order/order.service';
import {WarehouseService} from '../../services/order/warehouse.service';
import {PackageService} from '../../services/package/package.service';
import {WaitComponent} from './wait/wait.component';
import {StoreComponent} from './store/store.component';
import {BillComponent} from './bill/bill.component';
import {BillDetailComponent} from './bill/bill.detail.component';
import {InventoryComponent} from './inventory/inventory.component';
import {ReceiptComponent} from './receipt/receipt.component';
import {NgxBarcodeModule} from 'ngx-barcode';

import {WarehouseRoutingModule} from './warehouse.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, WarehouseRoutingModule, SharedModule, CollapseModule.forRoot(), NgxBarcodeModule.forRoot()],
  declarations: [
    WaitComponent,
    StoreComponent,
    BillComponent,
    BillDetailComponent,
    InventoryComponent,
    ReceiptComponent
  ],
  exports: [],
  providers: [OrderService, WarehouseService, PackageService]
})
export class WarehouseModule {
}
