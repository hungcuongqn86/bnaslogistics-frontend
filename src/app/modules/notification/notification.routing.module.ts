import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NotificationComponent} from './notification.component';

const routes: Routes = [
    {path: '', component: NotificationComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class NotificationRoutingModule {
    constructor() {
    }
}
