import {Component} from '@angular/core';
import {UserService} from '../../../../services/muser/user.service';
import {AuthService} from '../../../../auth.service';
import {IRole} from '../../../../models/interface';
import {BankAccountService} from '../../../../services/bankAccount.service';

@Component({
  selector: 'app-mcustumer-internal-detail-info',
  templateUrl: './iinfo.component.html',
  styleUrls: ['./iinfo.component.css']
})

export class IinfoComponent {
  roles: IRole[];

  constructor(public userService: UserService,
              public bankAccountService: BankAccountService,
              public authService: AuthService) {
  }

}
