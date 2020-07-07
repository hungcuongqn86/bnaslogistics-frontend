import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WalletComponent} from './wallet.component';

const routes: Routes = [
    {
        path: '', component: WalletComponent,
        data: {
            title: 'Ví điện tử'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class WalletRoutingModule {
    constructor() {
    }
}
