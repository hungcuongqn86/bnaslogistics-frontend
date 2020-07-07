import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserComponent} from './user/user.component';
import {UserDetailComponent} from './user/user.detail.component';

const routes: Routes = [
    {
        path: 'user', component: UserComponent,
        data: {
            title: 'Người dùng'
        }
    },
    {
        path: 'user/add', component: UserDetailComponent,
        data: {
            title: 'Thêm người dùng'
        }
    },
    {
        path: 'user/edit/:id', component: UserDetailComponent,
        data: {
            title: 'Sửa người dùng'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class MuserRoutingModule {
    constructor() {
    }
}
