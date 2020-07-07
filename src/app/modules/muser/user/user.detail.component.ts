import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/muser/user.service';

@Component({
    selector: 'app-muser-user-detail',
    templateUrl: './user.detail.component.html',
    styleUrls: ['./user.detail.component.css']
})

export class UserDetailComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute
        , public userService: UserService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.userService.user.id = params['id'];
            }
        });
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
        } else {
            this.userService.reset();
        }
    }

    public backlist() {
        this.router.navigate(['/muser/user']);
    }
}
