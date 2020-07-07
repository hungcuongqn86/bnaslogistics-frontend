import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CustumerComponent} from './custumer/custumer.component';
import {CustumerDetailComponent} from './custumer/custumer.detail.component';
import {InternalComponent} from './internal/internal.component';
import {InternalDetailComponent} from './internal/internal.detail.component';

const routes: Routes = [
    {
        path: 'custumer', component: CustumerComponent,
        data: {
            title: 'Khách hàng'
        }
    },
    {
        path: 'custumer/edit/:id', component: CustumerDetailComponent,
        data: {
            title: 'Thông tin khách hàng'
        }
    },
    {
        path: 'internal', component: InternalComponent,
        data: {
            title: 'Tài khoản nội bộ'
        }
    },
    {
        path: 'internal/edit/:id', component: InternalDetailComponent,
        data: {
            title: 'Lịch sử giao dịch'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class McustumerRoutingModule {
    constructor() {
    }
}
