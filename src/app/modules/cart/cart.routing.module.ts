import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CartComponent} from './cart.component';

const routes: Routes = [
    {
        path: '', component: CartComponent,
        data: {
            title: 'Giỏ hàng'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class CartRoutingModule {
    constructor() {
    }
}
