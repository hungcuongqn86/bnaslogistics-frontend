import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
    {
        path: 'profile', component: ProfileComponent,
        data: {
            title: 'Thông tin tài khoản'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class AccountRoutingModule {
    constructor() {
    }
}
