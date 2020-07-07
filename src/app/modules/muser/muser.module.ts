import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {UserService} from '../../services/muser/user.service';
import {PartnerService} from '../../services/mpartner/partner.service';
import {UserComponent} from './user/user.component';
import {UserDetailComponent} from './user/user.detail.component';
import {InfoComponent} from './user/info/info.component';

import {MuserRoutingModule} from './muser.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, MuserRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        UserComponent,
        UserDetailComponent,
        InfoComponent
    ],
    exports: [],
    providers: [UserService, PartnerService]
})
export class MuserModule {
}
