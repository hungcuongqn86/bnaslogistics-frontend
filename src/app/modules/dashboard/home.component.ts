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

  statisticTaobao = {
    new: 0,
    complete: 0
  };
  statisticTmall = {
    new: 0,
    complete: 0
  };
  statistic1688 = {
    new: 0,
    complete: 0
  };

  orderstatistic: any;
  orderstatusstatistic: any;

  dateNumber = 30;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Ngày';
  showYAxisLabel = true;
  yAxisLabel = 'Đơn hàng';

  colorScheme = {
    domain: ['#5AA454']
  };

  constructor(public dashboardService: DashboardService, private router: Router, public authService: AuthService) {

  }

  ngOnInit() {
    this.loadData();
  }

  public onSelect(event) {

  }

  public setDateNumber(value: number) {
    this.dateNumber = value;
    this.loadData();
  }

  public loadData() {
    this.getStatisticTaobao();
    this.getStatisticTmall();
    this.getStatistic1688();
    this.orderstatisticbyday();
    this.orderstatisticbystatus();
  }

  public getStatisticTaobao() {
    this.dashboardService.getStatisticTaobao(this.dateNumber.toString())
      .subscribe(data => {
        this.statisticTaobao = data.data;
      });
  }

  public getStatisticTmall() {
    this.dashboardService.getStatisticTmall(this.dateNumber.toString())
      .subscribe(data => {
        this.statisticTmall = data.data;
      });
  }

  public getStatistic1688() {
    this.dashboardService.getStatistic1688(this.dateNumber.toString())
      .subscribe(data => {
        this.statistic1688 = data.data;
      });
  }

  public orderstatisticbyday() {
    this.dashboardService.orderstatisticbyday(this.dateNumber.toString())
      .subscribe(data => {
        this.orderstatistic = data.data;
      });
  }

  public orderstatisticbystatus() {
    this.dashboardService.orderstatisticbystatus(this.dateNumber.toString())
      .subscribe(data => {
        this.orderstatusstatistic = data.data;
      });
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
    if (this.search.cn_key !== '') {
      let rdUrl = '';
      if (this.search.web === 'taobao.com') {
        rdUrl = `https://s.taobao.com/search?q=${this.search.cn_key}`;
      }
      if (this.search.web === '1688.com') {
        rdUrl = `https://s.1688.com/selloffer/offer_search.htm?keywords=${this.search.cn_key}&spm=a26352.13672862.searchbox.input`;
      }
      if (this.search.web === 'tmall.com') {
        rdUrl = `https://list.tmall.com/search_product.htm?q=${this.search.cn_key}&type=p&from=.list.pc_1_searchbutton`;
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
