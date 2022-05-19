import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardService} from '../../services/dashboard.service';
import {AuthService} from '../../auth.service';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {viLocale} from 'ngx-bootstrap/locale';
import {defineLocale} from 'ngx-bootstrap/chronos';

defineLocale('vi', viLocale);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  bsConfig = {containerClass: 'theme-dark-blue', showPreviousMonth: true};

  newLink = 0;
  completeOrder = 0;
  newOrder = 0;
  newUser = 0;
  newComplain = 0;
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

  dateNumber = 30;
  startValue = new Date();
  bsRangeValue: Date[];
  finishDate = new Date();
  today = new Date();

  @ViewChild('rangePicker') rangePicker;

  constructor(public dashboardService: DashboardService, private router: Router,
              private localeService: BsLocaleService,
              public authService: AuthService) {
    if (authService.hasRole('custumer')) {
      this.router.navigate(['/home']);
    }
    this.localeService.use('vi');
    this.startValue.setDate(this.startValue.getDate() - this.dateNumber);
    this.bsRangeValue = [this.startValue, this.finishDate];
  }

  ngOnInit() {
    this.loadData();
  }

  onDateRangePickerShow() {
    // This is a workaround to show previous month
    const prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
  }

  setDateNumber(value: number) {
    this.dateNumber = value;
    this.loadData();
  }

  loadData() {
    // this.getNewLinkCount();
    this.getNewOrderCount();
    this.getCompleteOrderCount();
    this.getNewUserCount();
    this.getNewComplainCount();
    this.getStatisticTaobao();
    this.getStatisticTmall();
    this.getStatistic1688();
    this.orderstatisticbyday();
    this.orderstatisticbystatus();
  }

  onSelect(event) {

  }

  public getNewLinkCount() {
    this.dashboardService.getNewLinkCount(this.dateNumber.toString())
      .subscribe(data => {
        this.newLink = data.data.newlinks;
      });
  }

  public getNewOrderCount() {
    this.dashboardService.getNewOrderCount(this.dateNumber.toString())
      .subscribe(data => {
        this.newOrder = data.data.neworders;
      });
  }

  public getCompleteOrderCount() {
    this.dashboardService.getCompleteOrderCount(this.dateNumber.toString())
      .subscribe(data => {
        this.completeOrder = data.data.completeOrders;
      });
  }

  public getNewUserCount() {
    this.dashboardService.getNewUserCount(this.dateNumber.toString())
      .subscribe(data => {
        this.newUser = data.data.newusers;
      });
  }

  public getNewComplainCount() {
    this.dashboardService.getNewComplainCount(this.dateNumber.toString())
      .subscribe(data => {
        this.newComplain = data.data.newcomplains;
      });
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
}
