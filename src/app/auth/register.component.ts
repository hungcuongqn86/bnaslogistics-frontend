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
  public rError = false;
  public sSuccess = false;
  public alert: string[];
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
    this.rError = false;
    this.sSuccess = false;
    this.alert = [];

    this.authService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.authService.register(this.register)
      .subscribe((res: any) => {
        if (res.status) {
          this.sSuccess = true;
          this.rError = false;
          const tb = `Đăng ký thành công! Chúng tôi đã gửi link kích hoạt tài khoản đến địa chỉ email: ${this.register.email}` +
            `, vui lòng kiểm tra hòm thư và kích hoạt tài khoản!`;
          this.alert = [tb];
        } else {
          this.rError = true;
          this.sSuccess = false;
          if (res.data && res.data.length > 0) {
            this.alert = res.data;
          } else {
            this.alert = ['Đăng ký không thành công, vui lòng liên hệ với Admin để được hỗ trợ!'];
          }
        }
        this.sub.unsubscribe();
        this.authService.showLoading(false);
      }, (error) => {
        this.rError = true;
        this.sSuccess = false;
        this.alert = ['Đăng ký không thành công, vui lòng liên hệ với Admin để được hỗ trợ!'];
        this.sub.unsubscribe();
        this.authService.showLoading(false);
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
