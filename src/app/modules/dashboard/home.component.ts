import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardService} from '../../services/dashboard.service';
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public search = {
    web: '1688.com',
    key: ''
  };

  constructor(public dashboardService: DashboardService, private router: Router, public authService: AuthService) {

  }

  ngOnInit() {

  }

  public searchProduct() {
    console.log(1111);
  }
}
