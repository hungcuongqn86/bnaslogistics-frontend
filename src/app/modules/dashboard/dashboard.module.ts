import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {DashboardService} from '../../services/dashboard.service';
import {DashboardComponent} from './dashboard.component';

import {DashboardRoutingModule} from './dashboard.routing.module';

@NgModule({
    imports: [CommonModule, FormsModule, DashboardRoutingModule],
    declarations: [
        DashboardComponent
    ],
    exports: [],
    providers: [DashboardService]
})
export class DashboardModule {
}
