import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShopService} from '../../../services/mshop/shop.service';
import {Subscription} from 'rxjs';
import {IShop} from '../../../models/interface';

@Component({
  selector: 'app-mshop-myshop-detail',
  templateUrl: './myshop.detail.component.html',
  styleUrls: ['./myshop.detail.component.css']
})

export class MyshopDetailComponent implements OnInit, OnDestroy {
  sub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute
    , public shopService: ShopService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.shopService.shop.id = params['id'];
      }
    });
  }

  ngOnInit() {
    if (this.shopService.shop && this.shopService.shop.id) {
      this.shopService.getShop(this.shopService.shop.id)
        .subscribe(shop => {
          this.shopService.shop = shop.data;
        });
    }
  }

  public updateShop() {
    if (this.shopService.shop) {
      this.shopService.showLoading(true);
      this.sub = this.shopService.updateShop(this.shopService.shop)
        .subscribe(res => {
            this.router.navigate(['/mshop/myshop']);
          },
          error => {
            this.shopService.showLoading(false);
            this.sub.unsubscribe();
          });
    }
  }

  public backlist() {
    this.router.navigate(['/mshop/myshop']);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
