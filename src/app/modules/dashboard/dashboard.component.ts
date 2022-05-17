import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardService} from '../../services/dashboard.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  bsConfig = Object.assign({}, {containerClass: 'theme-dark-blue'});

  newLink = 0;
  newOrder = 0;
  newUser = 0;
  newComplain = 0;
  statisticTaobao = {
    link: 0,
    order: 0
  };
  statisticTmall = {
    link: 0,
    order: 0
  };
  statistic1688 = {
    link: 0,
    order: 0
  };

  orderstatistic: any;
  orderstatusstatistic: any;

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

  dateNumber = '7';

  constructor(public dashboardService: DashboardService, private router: Router, public authService: AuthService) {
    if (authService.hasRole('custumer')) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loadData();
  }

  setDateNumber(value: string) {
    this.dateNumber = value;
    this.loadData();
  }

  loadData() {
    this.getNewLinkCount();
    this.getNewOrderCount();
    this.getNewUserCount();
    this.getNewComplainCount();
    this.getStatisticTaobao();
    this.getStatisticTmall();
    this.getStatistic1688();
    this.orderstatisticbyday();
    this.orderstatisticbystatus();
  }

  onSelect(event) {
    console.log(event);
  }

  public getNewLinkCount() {
    this.dashboardService.getNewLinkCount(this.dateNumber)
      .subscribe(data => {
        this.newLink = data.data.newlinks;
      });
  }

  public getNewOrderCount() {
    this.dashboardService.getNewOrderCount(this.dateNumber)
      .subscribe(data => {
        this.newOrder = data.data.neworders;
      });
  }

  public getNewUserCount() {
    this.dashboardService.getNewUserCount(this.dateNumber)
      .subscribe(data => {
        this.newUser = data.data.newusers;
      });
  }

  public getNewComplainCount() {
    this.dashboardService.getNewComplainCount(this.dateNumber)
      .subscribe(data => {
        this.newComplain = data.data.newcomplains;
      });
  }

  public getStatisticTaobao() {
    this.dashboardService.getStatisticTaobao(this.dateNumber)
      .subscribe(data => {
        this.statisticTaobao = data.data;
      });
  }

  public getStatisticTmall() {
    this.dashboardService.getStatisticTmall(this.dateNumber)
      .subscribe(data => {
        this.statisticTmall = data.data;
      });
  }

  public getStatistic1688() {
    this.dashboardService.getStatistic1688(this.dateNumber)
      .subscribe(data => {
        this.statistic1688 = data.data;
      });
  }

  public orderstatisticbyday() {
    this.dashboardService.orderstatisticbyday(this.dateNumber)
      .subscribe(data => {
        this.orderstatistic = data.data;
      });
  }

  public orderstatisticbystatus() {
    this.dashboardService.orderstatisticbystatus(this.dateNumber)
      .subscribe(data => {
        this.orderstatusstatistic = data.data;
      });
  }
}
