import {Component} from '@angular/core';
import {UserService} from '../../../../services/muser/user.service';
import {Role} from '../../../../models/User';

@Component({
    selector: 'app-muser-user-detail-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class InfoComponent {
    roles: Role[];

    constructor(public userService: UserService) {
        this.getRoles();
    }

    public getRoles() {
        this.userService.getRoles()
            .subscribe(roles => {
                this.roles = roles.data;
            });
    }
}
