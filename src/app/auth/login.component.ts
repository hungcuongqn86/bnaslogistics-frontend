import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

export interface User {
    email: string;
    password: string;
    remember_me: boolean;
}

export interface Token {
    status: boolean;
    access_token: string;
    token_type: string;
    expires_at: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    rError;
    alert;
    fdata: any = {email: '', password: '', remember_me: false, captcha: ''};

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
    }

    public handleSuccess(data) {
        this.fdata.captcha = data;
    }

    public actionLogin() {
        const useri: User = {
            email: this.fdata.email,
            password: this.fdata.password,
            remember_me: this.fdata.remember_me
        };
        this.authService.login(useri)
            .subscribe((token: Token) => {
                if (token.status) {
                    this.authService.setAuthorizationToken(token);
                    this.router.navigate(['/dashboard']);
                } else {
                    this.rError = true;
                    this.alert = 'Đăng nhập không thành công!';
                }
            }, (error) => {
                this.rError = true;
                this.alert = 'Đăng nhập không thành công!';
            });
    }

    public register() {
        this.router.navigate(['/register']);
    }
}
