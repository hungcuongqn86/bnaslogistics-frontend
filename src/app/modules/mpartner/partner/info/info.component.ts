import {Component} from '@angular/core';
import {PartnerService} from '../../../../services/mpartner/partner.service';

@Component({
    selector: 'app-mpartner-partner-detail-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class InfoComponent {
    constructor(public partnerService: PartnerService) {

    }
}
