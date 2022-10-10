import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {clientid} from '../const';
import {Subscription} from 'rxjs';

export interface Register {
  name: string;
  email: string;
  password: string;
  c_password: string;
  phone_number: string;
  partner_id: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public register: Register;
  public rError;
  public sSuccess;
  public alert;
  public sub: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.register = {
      name: null,
      email: null,
      password: null,
      c_password: null,
      phone_number: null,
      partner_id: clientid
    };
  }

  ngOnInit() {
  }

  public registerAcc() {
    this.authService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.authService.register(this.register)
      .subscribe((res: any) => {
        if (res.status) {
          this.sSuccess = true;
          this.rError = false;
          this.alert = `Đăng ký thành công! Chúng tôi gửi cho bạn 1 link kích hoạt đến địa chỉ email: ${this.register.email}, hãy kiểm tra hòm thư và kích hoạt tài khoản!`;
        } else {
          this.rError = true;
          this.sSuccess = false;
          this.alert = res.data[0];
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
