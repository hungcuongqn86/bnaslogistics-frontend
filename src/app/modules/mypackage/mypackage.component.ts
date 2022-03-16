import {Component, OnInit, ViewEncapsulation, TemplateRef, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PackageService} from '../../services/package/package.service';
import {IPackage, PackageStatus} from '../../models/interface';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth.service';
import {email_nv} from '../../const';

@Component({
    selector: 'app-mypackage',
    templateUrl: './mypackage.component.html',
    styleUrls: ['./mypackage.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class MypackageComponent implements OnInit, OnDestroy {
    packages: IPackage[];
    pkStatus: PackageStatus[];
    totalItems = 0;
    errorMessage: string[] = [];
    counts: { status: number, total: number }[];
    sub: Subscription;
    nv = false;

    constructor(public packageService: PackageService, private route: ActivatedRoute, public authService: AuthService,
                private router: Router) {
        this.route.params.subscribe(params => {
            if (params['package_code']) {
                this.packageService.search.package_code = params['package_code'];
            }
        });
        this.counts = null;
        this.nv = email_nv.includes(authService.user.email);
    }

    ngOnInit() {
        this.searchPackages();
        this.getPkStatus();
    }

    pageChanged(event: any): void {
        this.packageService.search.page = event.page;
        this.searchPackages();
    }

    public searchPackages() {
        this.packageService.showLoading(true);
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.sub = this.packageService.getPackages()
            .subscribe(data => {
                this.packages = data.data.data;
                this.totalItems = data.data.total;
                this.packageService.showLoading(false);
            });
    }

    public getPkStatus() {
        this.packageService.showLoading(true);
        this.packageService.getPkStatus()
            .subscribe(pks => {
                this.pkStatus = pks.data;
                this.packageService.showLoading(false);
            });
    }

    selectTab(status: string = null) {
        this.packageService.search.status = status;
        this.searchPackages();
    }

    gotoOrder(orderId: number) {
        const win = window.open(`./order/myorder/detail/${orderId}`, '_blank');
        win.focus();
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
