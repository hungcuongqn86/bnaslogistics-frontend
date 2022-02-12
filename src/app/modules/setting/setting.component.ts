import {Component} from '@angular/core';
import {SettingService} from '../../services/setting/setting.service';
import {IServiceFee, ISetting, IVip} from '../../models/Setting';
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
  serviceFees: IServiceFee[];

  constructor(public settingService: SettingService, private router: Router) {
    this.getAllListData();
  }

  private getAllListData() {
    this.settingService.showLoading(true);
    const getSettingsObs: Observable<any> = this.settingService.getSettings();
    const getVipsObs: Observable<any> = this.settingService.getVips();
    const getServiceFeesObs: Observable<any> = this.settingService.getServiceFees();

    const listSub = forkJoin([
      getSettingsObs,
      getVipsObs,
      getServiceFeesObs
    ]).subscribe(([settings, vips, serviceFees]) => {
      this.settings = settings.data.data;
      this.vips = vips.data.data;
      this.serviceFees = serviceFees.data.data;
      this.settingService.showLoading(false);
      listSub.unsubscribe();
    });
  }

  public editSetting(id) {
    this.router.navigate([`/setting/edit/${id}`]);
  }
}
