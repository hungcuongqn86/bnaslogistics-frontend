import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardService} from '../../services/dashboard.service';
import {AuthService} from '../../auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  sub: Subscription;
  public search = {
    web: '1688.com',
    key: ''
  };

  constructor(public dashboardService: DashboardService, private router: Router, public authService: AuthService) {

  }

  ngOnInit() {

  }

  public searchProduct() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.dashboardService.googleTranslate(this.search.key)
      .subscribe(data => {
          console.log(data);
          this.sub.unsubscribe();
        },
        error => {
          if (this.sub) {
            this.sub.unsubscribe();
          }
        },
        () => {
          if (this.sub) {
            this.sub.unsubscribe();
          }
        });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
