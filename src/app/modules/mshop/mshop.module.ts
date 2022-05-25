import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {ShopService} from '../../services/mshop/shop.service';
import {MyshopComponent} from './myshop/myshop.component';
import {MyshopDetailComponent} from './myshop/myshop.detail.component';

import {MshopRoutingModule} from './mshop.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, MshopRoutingModule, SharedModule, CollapseModule.forRoot()],
  declarations: [
    MyshopComponent,
    MyshopDetailComponent
  ],
  exports: [],
  providers: [ShopService]
})
export class MshopModule {
}