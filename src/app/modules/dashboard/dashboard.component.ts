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

  constructor(public dashboardService: DashboardService, private router: Router, public authService: AuthService) {
    if (authService.hasRole('custumer')) {
      this.router.navigate(['/order/myorder/0/od']);
    }
  }

  ngOnInit() {

  }
}
