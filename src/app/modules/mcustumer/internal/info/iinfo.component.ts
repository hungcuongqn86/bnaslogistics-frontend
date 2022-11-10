import {Component} from '@angular/core';
import {UserService} from '../../../../services/muser/user.service';
import {PartnerService} from '../../../../services/mpartner/partner.service';
import {Partner} from '../../../../models/Partner';
import {AuthService} from '../../../../auth.service';
import {forkJoin, Observable} from 'rxjs';
import {IRole, IUser, IVip} from '../../../../models/interface';
import {SettingService} from '../../../../services/setting/setting.service';

@Component({
  selector: 'app-mcustumer-internal-detail-info',
  templateUrl: './iinfo.component.html',
  styleUrls: ['./iinfo.component.css']
})

export class IinfoComponent {
  roles: IRole[];
  partners: Partner[];
  handers: IUser[] = [];
  vips: IVip[];

  constructor(public userService: UserService, public settingService: SettingService, private partnerService: PartnerService,
              public authService: AuthService) {
    this.getRoles();
    this.getPartners();
    this.getHandles();
    this.getVips();
  }

  public getRoles() {
    this.userService.getRoles()
      .subscribe(roles => {
        this.roles = roles.data;
      });
  }

  public getPartners() {
    this.partnerService.getPartners()
      .subscribe(partners => {
        this.partners = partners.data.data;
      });
  }

  public getHandles() {
    this.userService.showLoading(true);
    this.userService.getHandles()
      .subscribe(handers => {
        this.handers = handers.data;
        this.userService.showLoading(false);
      });
  }

  private getVips() {
    this.settingService.showLoading(true);
    const getVipsObs: Observable<any> = this.settingService.getVips();

    const listSub = forkJoin([
      getVipsObs
    ]).subscribe(([vips]) => {
      this.vips = vips.data.data;
      this.settingService.showLoading(false);
      listSub.unsubscribe();
    });
  }
}