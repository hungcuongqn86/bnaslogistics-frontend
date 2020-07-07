import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PartnerComponent} from './partner/partner.component';
import {PartnerDetailComponent} from './partner/partner.detail.component';

const routes: Routes = [
    {
        path: 'partner', component: PartnerComponent,
        data: {
            title: 'Đối tác'
        }
    },
    {
        path: 'partner/add', component: PartnerDetailComponent,
        data: {
            title: 'Thêm đối tác'
        }
    },
    {
        path: 'partner/edit/:id', component: PartnerDetailComponent,
        data: {
            title: 'Sửa đối tác'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class MpartnerRoutingModule {
    constructor() {
    }
}
