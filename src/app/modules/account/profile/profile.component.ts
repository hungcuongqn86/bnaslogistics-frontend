import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/muser/user.service';
import {AuthService} from '../../../auth.service';

@Component({
    selector: 'app-account-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, public userService: UserService) {
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
                });
        }
    }
}
