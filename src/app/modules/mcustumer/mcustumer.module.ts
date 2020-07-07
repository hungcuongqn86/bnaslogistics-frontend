import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {UserService} from '../../services/muser/user.service';
import {PartnerService} from '../../services/mpartner/partner.service';
import {BankAccountService} from '../../services/bankAccount.service';

import {CustumerComponent} from './custumer/custumer.component';
import {CustumerDetailComponent} from './custumer/custumer.detail.component';
import {InfoComponent} from './custumer/info/info.component';
import {TransactionComponent} from './custumer/transaction/transaction.component';

import {InternalComponent} from './internal/internal.component';
import {InternalDetailComponent} from './internal/internal.detail.component';
import {ItransactionComponent} from './internal/itransaction/itransaction.component';

import {McustumerRoutingModule} from './mcustumer.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, McustumerRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        CustumerComponent,
        CustumerDetailComponent,
        InfoComponent,
        TransactionComponent,
        InternalComponent,
        InternalDetailComponent,
        ItransactionComponent
    ],
    exports: [],
    providers: [UserService, PartnerService, BankAccountService]
})
export class McustumerModule {
}
