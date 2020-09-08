import {Component} from '@angular/core';
import {UserService} from '../../../../services/muser/user.service';
import {PartnerService} from '../../../../services/mpartner/partner.service';
import {Role, User, Vip} from '../../../../models/User';
import {Partner} from '../../../../models/Partner';
import {AuthService} from '../../../../auth.service';

@Component({
  selector: 'app-mcustumer-custumer-detail-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent {
  roles: Role[];
  partners: Partner[];
  handers: User[] = [];
  vips: Vip[];

  constructor(public userService: UserService, private partnerService: PartnerService, public authService: AuthService) {
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

  public getVips() {
    this.userService.showLoading(true);
    this.userService.getVips()
      .subscribe(vips => {
        this.vips = vips.data;
        this.userService.showLoading(false);
      });
  }
}
