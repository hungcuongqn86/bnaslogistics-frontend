import {Component} from '@angular/core';
import {SettingService} from '../../services/setting/setting.service';
import {Setting} from '../../models/Setting';
import {Router} from '@angular/router';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.css']
})

export class SettingComponent {
    settings: Setting[];

    constructor(public settingService: SettingService, private router: Router) {
        this.getSetting();
    }

    private getSetting() {
        this.settingService.getSettings()
            .subscribe(setting => {
                this.settings = setting.data.data;
            });
    }

    public editSetting(id) {
        this.router.navigate([`/setting/edit/${id}`]);
    }
}
