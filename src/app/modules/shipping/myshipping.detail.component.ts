import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShippingService} from '../../services/shipping/shipping.service';

@Component({
  selector: 'app-myshipping-detail',
  templateUrl: './myshipping.detail.component.html',
  styleUrls: ['./myshipping.detail.component.css']
})

export class MyshippingDetailComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute
    , public shippingService: ShippingService) {
    this.route.params.subscribe(params => {
      /*if (params['id']) {
        this.orderService.orderRe.id = params['id'];
        this.getOrder();
      }*/
    });
  }

  ngOnInit() {
  }

  private getOrder() {
    /*if (this.orderService.orderRe.id !== null) {
      this.orderService.getOrder(this.orderService.orderRe.id)
        .subscribe(order => {
          this.orderService.orderRe = order.data;
        });
    }*/
  }

  public backlist() {
    this.router.navigate(['/order/list']);
  }
}
