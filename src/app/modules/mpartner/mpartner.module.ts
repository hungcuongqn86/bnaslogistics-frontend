import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {PartnerService} from '../../services/mpartner/partner.service';
import {PartnerComponent} from './partner/partner.component';
import {PartnerDetailComponent} from './partner/partner.detail.component';
import {InfoComponent} from './partner/info/info.component';

import {MpartnerRoutingModule} from './mpartner.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, MpartnerRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        PartnerComponent,
        PartnerDetailComponent,
        InfoComponent
    ],
    exports: [],
    providers: [PartnerService]
})
export class MpartnerModule {
}
