import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {PackageService} from '../../services/package/package.service';
import {PackageComponent} from './package.component';

import {PackageRoutingModule} from './package.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, PackageRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        PackageComponent
    ],
    exports: [],
    providers: [PackageService]
})
export class PackageModule {
}
