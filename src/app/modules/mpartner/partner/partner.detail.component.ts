import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PartnerService} from '../../../services/mpartner/partner.service';

@Component({
    selector: 'app-mpartner-partner-detail',
    templateUrl: './partner.detail.component.html',
    styleUrls: ['./partner.detail.component.css']
})

export class PartnerDetailComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute
        , public partnerService: PartnerService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.partnerService.partner.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.partnerService.partner.id !== null) {
            this.partnerService.getPartner(this.partnerService.partner.id)
                .subscribe(partner => {
                    this.partnerService.partner = partner.data.partner;
                });
        } else {
            this.partnerService.reset();
        }
    }

    public backlist() {
        this.router.navigate(['/mpartner/partner']);
    }
}
