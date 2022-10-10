import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'reset.component.html',
  styleUrls: ['reset.component.css']
})
export class ResetComponent implements OnInit, OnDestroy {
  public resetPass: { email: string, password: string, password_confirmation: string, token: string };
  public rError = false;
  public sSuccess = false;
  public alert: string[];
  public sub: Subscription;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.resetPass = {
      email: null,
      password: null,
      password_confirmation: null,
      token: null
    };
  }

  ngOnInit() {
  }

  public sendEmailResetPass() {
    this.rError = false;
    this.sSuccess = false;
    this.alert = [];

    this.authService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.authService.sendMailResetPass(this.resetPass.email)
      .subscribe((data: any) => {
        if (data.status) {
          this.sSuccess = true;
          this.rError = false;
          this.alert = ['Chúng tôi đã gửi email liên kết đặt lại mật khẩu của bạn, hãy kiểm tra hòm thư!!'];
        } else {
          this.sSuccess = false;
          this.rError = true;
          if (data.data && data.data.length > 0) {
            this.alert = data.data;
          } else {
            this.alert = ['Đặt lại mật khẩu không thành công, vui lòng liên hệ với Admin để được hỗ trợ!'];
          }
        }
        this.sub.unsubscribe();
        this.authService.showLoading(false);
      }, (error) => {
        this.rError = true;
        this.sSuccess = false;
        this.alert = ['Đặt lại mật khẩu không thành công, vui lòng liên hệ với Admin để được hỗ trợ!'];
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
