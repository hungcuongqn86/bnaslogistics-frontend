import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {CurrencyMaskModule} from 'ngx-currency-mask';

import {SettingService} from '../../services/setting/setting.service';
import {SettingComponent} from './setting.component';

import {SettingRoutingModule} from './setting.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, SettingRoutingModule, SharedModule, CollapseModule.forRoot(), CurrencyMaskModule],
  declarations: [
    SettingComponent
  ],
  exports: [],
  providers: [SettingService]
})
export class SettingModule {
}
