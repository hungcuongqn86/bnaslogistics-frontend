import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {OrderService} from '../../services/order/order.service';
import {WarehouseService} from '../../services/order/warehouse.service';
import {PackageService} from '../../services/package/package.service';
import {StoreComponent} from './store/store.component';
import {InventoryComponent} from './inventory/inventory.component';
import {ReceiptComponent} from './receipt/receipt.component';
import {BagComponent} from './bag/bag.component';
import {CreatebagComponent} from './bag/createbag.component';
import {NgxBarcodeModule} from 'ngx-barcode';

import {WarehousetqRoutingModule} from './warehousetq.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, WarehousetqRoutingModule, SharedModule, CollapseModule.forRoot(), NgxBarcodeModule.forRoot()],
  declarations: [
    StoreComponent,
    InventoryComponent,
    ReceiptComponent,
    BagComponent,
    CreatebagComponent
  ],
  exports: [],
  providers: [OrderService, WarehouseService, PackageService]
})
export class WarehousetqModule {
}
