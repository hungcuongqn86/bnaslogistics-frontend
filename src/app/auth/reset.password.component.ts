import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'reset.password.component.html',
    styleUrls: ['reset.password.component.css']
})
export class ResetPasswordComponent {
    private token = '';
    public resetPass: { email: string, password: string, password_confirmation: string, token: string };
    rError;
    sSuccess;
    alert;

    constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            if (params['token']) {
                this.token = params['token'];
                this.getInfo();
            }
        });

        this.resetPass = {
            email: null,
            password: null,
            password_confirmation: null,
            token: null
        };
    }

    private getInfo() {
        this.authService.getResetPass(this.token)
            .subscribe((data) => {
                this.resetPass = data.data;
            }, (error) => {
                this.rError = true;
                this.sSuccess = false;
                this.alert = error.message;
            });
    }

    public postResetPass() {
        if (this.resetPass.password_confirmation !== this.resetPass.password) {
            this.rError = true;
            this.sSuccess = false;
            this.alert = 'Nhắc lại mật khẩu không chính xác!';
            return false;
        }
        this.authService.postResetPass(this.resetPass)
            .subscribe((data: any) => {
                if (data.status) {
                    this.sSuccess = true;
                    this.rError = false;
                    this.alert = 'Thiết lập lại mật khẩu thành công!';
                } else {
                    this.sSuccess = false;
                    this.rError = true;
                    this.alert = data.message;
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
