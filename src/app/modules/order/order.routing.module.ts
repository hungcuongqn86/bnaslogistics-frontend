import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrderComponent} from './order/order.component';
import {OrderDetailComponent} from './order/order.detail.component';
import {MyorderComponent} from './myorder/myorder.component';
import {MyorderDetailComponent} from './myorder/myorder.detail.component';

import {OrderGuardService} from './order.guard.service';

const routes: Routes = [
    {
        path: 'list', component: OrderComponent,
        data: {
            title: 'Đơn hàng'
        },
        canActivate: [OrderGuardService]
    },
    {
        path: 'list/detail/:id', component: OrderDetailComponent,
        data: {
            title: 'Chi tiết đơn hàng'
        },
        canActivate: [OrderGuardService]
    },
    {
        path: 'myorder', component: MyorderComponent,
        data: {
            title: 'Đơn hàng'
        }
    },
    {
        path: 'myorder/detail/:id', component: MyorderDetailComponent,
        data: {
            title: 'Chi tiết đơn hàng'
        }
    },
    {
        path: 'myorder/:status', component: MyorderComponent,
        data: {
            title: 'Đơn hàng'
        }
    },
    {
        path: 'myorder/:status/:type', component: MyorderComponent,
        data: {
            title: 'Đơn hàng'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class OrderRoutingModule {
    constructor() {
    }
}
