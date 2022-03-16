import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PackageService} from '../../services/package/package.service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package.detail.component.html',
  styleUrls: ['./package.detail.component.css']
})

export class PackageDetailComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute
    , public packageService: PackageService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.packageService.package.id = params['id'];
        this.getPackage();
      }
    });
  }

  ngOnInit() {
  }

  private getPackage() {
    if (this.packageService.package.id !== null) {
      this.packageService.getPackage(this.packageService.package.id)
        .subscribe(res => {
          this.packageService.package = res.data;
        });
    }
  }

  public backlist() {
    this.router.navigate(['/package']);
  }
}
