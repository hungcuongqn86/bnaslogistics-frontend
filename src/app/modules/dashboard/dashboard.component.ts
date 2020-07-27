import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardService} from '../../services/dashboard.service';
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  newLink = 0;
  newOrder = 0;
  newUser = 0;
  newComplain = 0;

  constructor(public dashboardService: DashboardService, private router: Router, public authService: AuthService) {
    if (authService.hasRole('custumer')) {
      this.router.navigate(['/order/myorder/0/od']);
    }
  }

  ngOnInit() {
    this.getNewLinkCount();
    this.getNewOrderCount();
    this.getNewUserCount();
    this.getNewComplainCount();
  }

  public getNewLinkCount() {
    this.dashboardService.getNewLinkCount()
      .subscribe(data => {
        this.newLink = data.data.newlinks;
      });
  }

  public getNewOrderCount() {
    this.dashboardService.getNewOrderCount()
      .subscribe(data => {
        this.newOrder = data.data.neworders;
      });
  }

  public getNewUserCount() {
    this.dashboardService.getNewUserCount()
      .subscribe(data => {
        this.newUser = data.data.newusers;
      });
  }

  public getNewComplainCount() {
    this.dashboardService.getNewComplainCount()
      .subscribe(data => {
        this.newComplain = data.data.newcomplains;
      });
  }
}
