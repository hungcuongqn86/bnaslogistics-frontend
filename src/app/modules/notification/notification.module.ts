import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NotificationService} from '../../services/notification.service';
import {NotificationComponent} from './notification.component';

import {NotificationRoutingModule} from './notification.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, NotificationRoutingModule, SharedModule],
    declarations: [
        NotificationComponent
    ],
    exports: [],
    providers: [NotificationService]
})
export class NotificationModule {
}
