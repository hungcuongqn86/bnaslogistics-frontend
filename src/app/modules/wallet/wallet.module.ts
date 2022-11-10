import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {UserService} from '../../services/muser/user.service';
import {WalletComponent} from './wallet.component';

import {WalletRoutingModule} from './wallet.routing.module';
import {SharedModule} from '../../shared.module';
import {BankAccountService} from '../../services/bankAccount.service';

@NgModule({
    imports: [CommonModule, FormsModule, WalletRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        WalletComponent
    ],
    exports: [],
    providers: [UserService, BankAccountService]
})
export class WalletModule {
}
