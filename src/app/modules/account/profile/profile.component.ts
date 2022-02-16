import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/muser/user.service';
import {AuthService} from '../../../auth.service';
import {forkJoin, Observable} from "rxjs";
import {SettingService} from "../../../services/setting/setting.service";
import {IChinaWarehouse} from "../../../models/interface";

@Component({
  selector: 'app-account-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  chinaWarehouses: IChinaWarehouse[];

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, public userService: UserService, public settingService: SettingService) {
    this.userService.user.id = this.auth.user.id;
  }

  ngOnInit() {
    if (this.userService.user.id !== null) {
      this.userService.getUser(this.userService.user.id)
        .subscribe(user => {
          this.userService.user = user.data.user;
          if (this.userService.user.roles.length) {
            this.userService.user.role_id = this.userService.user.roles[0].id;
          }
          this.getChinaWarehouses();
        });
    }
  }

  private getChinaWarehouses() {
    this.settingService.showLoading(true);
    const getChinaWarehousesObs: Observable<any> = this.settingService.getChinaWarehouses();

    const listSub = forkJoin([
      getChinaWarehousesObs
    ]).subscribe(([chinaWarehouses]) => {
      this.chinaWarehouses = chinaWarehouses.data.data;
      this.setWarehouseInfo();
      this.settingService.showLoading(false);
      listSub.unsubscribe();
    });
  }

  private setWarehouseInfo() {
    const code = this.userService.user.code;
    this.chinaWarehouses.forEach(item => {
      item.address = item.address.replace('#code#', code);
      item.receiver = item.receiver.replace('#code#', code);
    });
  }
}
