import {Component} from '@angular/core';
import {SettingService} from '../../services/setting/setting.service';
import {ISetting, IVip} from '../../models/Setting';
import {Router} from '@angular/router';
import {forkJoin, Subject, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})

export class SettingComponent {
  settings: ISetting[];
  vips: IVip[];

  constructor(public settingService: SettingService, private router: Router) {
    this.getAllListData();
  }

  private getAllListData() {
    this.settingService.showLoading(true);
    const getSettingsObs: Observable<any> = this.settingService.getSettings();
    const getVipsObs: Observable<any> = this.settingService.getVips();

    const listSub = forkJoin([
      getSettingsObs,
      getVipsObs
    ]).subscribe(([settings, vips]) => {
      this.settings = settings.data.data;
      this.vips = vips.data.data;
      this.settingService.showLoading(false);
      listSub.unsubscribe();
    });
  }

  public editSetting(id) {
    this.router.navigate([`/setting/edit/${id}`]);
  }
}
