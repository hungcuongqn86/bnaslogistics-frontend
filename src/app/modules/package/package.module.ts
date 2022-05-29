import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {NgxBarcodeModule} from 'ngx-barcode';

import {PackageService} from '../../services/package/package.service';
import {PackageComponent} from './package.component';
import {PackageDetailComponent} from './package.detail.component';

import {PackageRoutingModule} from './package.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, NgxBarcodeModule.forRoot(), PackageRoutingModule, SharedModule, CollapseModule.forRoot()],
  declarations: [
    PackageComponent,
    PackageDetailComponent
  ],
  exports: [],
  providers: [PackageService]
})
export class PackageModule {
}
