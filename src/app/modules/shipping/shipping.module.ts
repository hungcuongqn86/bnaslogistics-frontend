import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {ShippingService} from '../../services/shipping/shipping.service';
import {ShippingComponent} from './shipping.component';
import {MyshippingComponent} from './myshipping.component';
import {MyshippingDetailComponent} from './myshipping.detail.component';
import {ShippingRoutingModule} from './shipping.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, ShippingRoutingModule, SharedModule, CollapseModule.forRoot()],
  declarations: [
    ShippingComponent,
    MyshippingComponent,
    MyshippingDetailComponent
  ],
  exports: [],
  providers: [ShippingService]
})
export class ShippingModule {
}
