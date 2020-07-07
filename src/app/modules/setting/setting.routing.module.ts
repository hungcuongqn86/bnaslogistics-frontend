import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SettingComponent} from './setting.component';
import {SettingDetailComponent} from './setting.detail.component';

const routes: Routes = [
    {
        path: '', component: SettingComponent,
        data: {
            title: 'Cấu hình hệ thống'
        }
    },
    {
        path: 'edit/:id', component: SettingDetailComponent,
        data: {
            title: 'Sửa cấu hình hệ thống'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class SettingRoutingModule {
    constructor() {
    }
}
