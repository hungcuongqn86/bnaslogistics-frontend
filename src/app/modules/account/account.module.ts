import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {UserService} from '../../services/muser/user.service';
import {PartnerService} from '../../services/mpartner/partner.service';
import {ProfileComponent} from './profile/profile.component';

import {AccountRoutingModule} from './account.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, AccountRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        ProfileComponent
    ],
    exports: [],
    providers: [UserService, PartnerService]
})
export class AccountModule {
}
