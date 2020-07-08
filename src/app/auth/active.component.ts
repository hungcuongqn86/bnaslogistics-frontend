import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'active.component.html',
    styleUrls: ['active.component.css']
})
export class ActiveComponent {
    private token = '';
    public user: { email: string, name: string };
    rError = false;
    sSuccess = true;
    alert;

    constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            if (params['token']) {
                this.token = params['token'];
                this.postActive();
            }
        });
    }

    private postActive() {
        this.authService.postActive(this.token)
            .subscribe((data) => {
                if (data.status) {
                    this.user = data.data.user;
                } else {
                    this.rError = true;
                    this.sSuccess = false;
                    this.alert = data.data;
                }
            }, (error) => {
                this.rError = true;
                this.sSuccess = false;
                this.alert = error.message;
            });
    }

    public login() {
        this.router.navigate(['/login']);
    }
}
