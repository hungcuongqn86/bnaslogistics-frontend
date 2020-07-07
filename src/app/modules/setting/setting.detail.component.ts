import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingService} from '../../services/setting/setting.service';

@Component({
    selector: 'app-setting-detail',
    templateUrl: './setting.detail.component.html',
    styleUrls: ['./setting.detail.component.css']
})

export class SettingDetailComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute
        , public settingService: SettingService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.settingService.setting.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.settingService.setting.id !== null) {
            this.settingService.getSetting(this.settingService.setting.id)
                .subscribe(setting => {
                    this.settingService.setting = setting.data.setting;
                });
        } else {
            this.settingService.reset();
        }
    }

    public backlist() {
        this.router.navigate(['/setting']);
    }
}
