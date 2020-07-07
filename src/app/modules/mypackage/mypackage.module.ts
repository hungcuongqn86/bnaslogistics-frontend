import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {PackageService} from '../../services/package/package.service';
import {MypackageComponent} from './mypackage.component';

import {MypackageRoutingModule} from './mypackage.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, MypackageRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        MypackageComponent
    ],
    exports: [],
    providers: [PackageService]
})
export class MypackageModule {
}
