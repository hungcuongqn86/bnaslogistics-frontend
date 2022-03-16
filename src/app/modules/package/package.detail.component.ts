import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PackageService} from '../../services/package/package.service';
import {IPackage} from "../../models/interface";
import {Package} from "../../models/model";

@Component({
  selector: 'app-package-detail',
  templateUrl: './package.detail.component.html',
  styleUrls: ['./package.detail.component.css']
})

export class PackageDetailComponent implements OnInit {
  package: IPackage;

  constructor(private router: Router, private route: ActivatedRoute
    , public packageService: PackageService) {
    this.reNewPackage();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.package.id = params['id'];
        this.getPackage();
      }
    });
  }

  ngOnInit() {
  }

  private reNewPackage() {
    this.package = new Package();
  }

  private getPackage() {
    if (this.package.id !== null) {
      this.packageService.getPackage(this.package.id)
        .subscribe(res => {
          this.package = res.data;
        });
    }
  }

  public backlist() {
    this.router.navigate(['/package']);
  }
}
