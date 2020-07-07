import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MypackageComponent} from './mypackage.component';

const routes: Routes = [
    {
        path: '', component: MypackageComponent,
        data: {
            title: 'Kiện hàng'
        }
    },
    {
        path: ':package_code', component: MypackageComponent,
        data: {
            title: 'Kiện hàng'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class MypackageRoutingModule {
    constructor() {
    }
}
