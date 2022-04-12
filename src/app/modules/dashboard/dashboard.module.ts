import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {DashboardService} from '../../services/dashboard.service';
import {DashboardComponent} from './dashboard.component';
import {HomeComponent} from './home.component';

import {DashboardRoutingModule} from './dashboard.routing.module';
import {SharedModule} from "../../shared.module";

@NgModule({
  imports: [CommonModule, FormsModule, DashboardRoutingModule, SharedModule],
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  exports: [],
  providers: [DashboardService]
})
export class DashboardModule {
}
