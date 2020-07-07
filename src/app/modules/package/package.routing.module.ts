import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PackageComponent} from './package.component';

const routes: Routes = [
    {
        path: '', component: PackageComponent,
        data: {
            title: 'Kiện hàng'
        }
    },
    {
        path: ':package_code', component: PackageComponent,
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

export class PackageRoutingModule {
    constructor() {
    }
}
