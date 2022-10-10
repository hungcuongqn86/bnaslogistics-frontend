import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'reset.password.component.html',
  styleUrls: ['reset.password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private token = '';
  public resetPass: { email: string, password: string, password_confirmation: string, token: string };
  public rError = false;
  public sSuccess = false;
  public alert: string[];
  public sub: Subscription;

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

  ngOnInit() {
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
      this.alert = ['Nhắc lại mật khẩu không chính xác!'];
      return false;
    }

    this.rError = false;
    this.sSuccess = false;
    this.alert = [];

    this.authService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.authService.postResetPass(this.resetPass)
      .subscribe((data: any) => {
        if (data.status) {
          this.sSuccess = true;
          this.rError = false;
          this.alert = ['Thiết lập lại mật khẩu thành công!'];
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
