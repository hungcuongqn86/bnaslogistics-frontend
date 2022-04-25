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
    key: '',
    cn_key: ''
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
          if (data.data && data.data.key) {
            this.search.cn_key = data.data.key;
          }
          this.redirectToSearch();
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

  private redirectToSearch() {
    if (this.search.cn_key != '') {
      let rdUrl = '';
      if (this.search.web == 'taobao.com') {
        rdUrl = `https://s.taobao.com/search?q=${this.search.cn_key}`;
      }
      if (this.search.web == '1688.com') {
        rdUrl = `https://s.1688.com/selloffer/offer_search.htm?keywords=${this.search.cn_key}&spm=a26352.13672862.searchbox.input`;
      }
      const win = window.open(rdUrl, '_blank');
      win.focus();
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
