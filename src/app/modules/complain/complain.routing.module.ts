import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ComplainComponent} from './complain.component';

const routes: Routes = [
    {
        path: '', component: ComplainComponent,
        data: {
            title: 'Khiếu nại'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class ComplainRoutingModule {
    constructor() {
    }
}
