import {ModuleWithProviders, NgModule} from '@angular/core';
import {MessageDirective} from './messages/message.directive';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ProgressbarModule} from 'ngx-bootstrap';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {AlertModule} from 'ngx-bootstrap/alert';
import {AppBreadcrumbModule} from '@coreui/angular';
import {TempPricePipe} from './pipes/price';
import {TempTotalPricePipe} from './pipes/totalPrice';
import {TempTongTienHangPipe} from './pipes/tongTienHang';
import {TempStatusPipe} from './pipes/status';
import {TempPkStatusPipe} from './pipes/pkStatus';
import {TempCountByStatusPipe} from './pipes/countByStatus';
import {TempHistoryTypePipe} from './pipes/historyType';
import {TempDatePipe} from './pipes/date';
import {AutofocusDirective} from './directive/autoFocus';

@NgModule({
    imports: [AppBreadcrumbModule.forRoot(), PaginationModule.forRoot(),
        ModalModule.forRoot(), ProgressbarModule.forRoot(), TabsModule.forRoot(), BsDatepickerModule.forRoot(), AlertModule.forRoot()],
    declarations: [MessageDirective, TempPricePipe, TempTotalPricePipe, TempTongTienHangPipe, TempStatusPipe, TempPkStatusPipe, TempCountByStatusPipe
        , TempDatePipe, TempHistoryTypePipe, AutofocusDirective],
    exports: [MessageDirective, PaginationModule, ModalModule, ProgressbarModule, TabsModule,
        AppBreadcrumbModule, BsDatepickerModule, AlertModule, TempPricePipe, TempTotalPricePipe,
        TempTongTienHangPipe, TempStatusPipe, TempPkStatusPipe, TempCountByStatusPipe,
        TempDatePipe, TempHistoryTypePipe, AutofocusDirective],
    providers: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }

    constructor() {

    }
}
