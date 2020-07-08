import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'reset.component.html',
    styleUrls: ['reset.component.css']
})
export class ResetComponent {
    public resetPass: { email: string, password: string, password_confirmation: string, token: string };
    rError;
    sSuccess;
    alert;

    constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
        this.resetPass = {
            email: null,
            password: null,
            password_confirmation: null,
            token: null
        };
    }

    public sendEmailResetPass() {
        this.authService.sendMailResetPass(this.resetPass.email)
            .subscribe((data: any) => {
                if (data.status) {
                    this.sSuccess = true;
                    this.rError = false;
                    this.alert = 'Chúng tôi đã gửi email liên kết đặt lại mật khẩu của bạn, hãy kiểm tra hòm thư!!';
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
