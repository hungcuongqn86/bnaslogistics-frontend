import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShippingService} from '../../services/shipping/shipping.service';
import {ICarrier, ICarrierPackage} from "../../models/interface";
import {Carrier, CarrierPackage} from "../../models/model";

@Component({
  selector: 'app-myshipping-detail',
  templateUrl: './myshipping.detail.component.html',
  styleUrls: ['./myshipping.detail.component.css']
})

export class MyshippingDetailComponent implements OnInit {
  public carrier: ICarrier;
  public carrierPackage: ICarrierPackage;
  public col = '';

  constructor(private router: Router, private route: ActivatedRoute
    , public shippingService: ShippingService) {
    this.carrier = new Carrier();
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

  public selectPackage(item: ICarrierPackage, col: string) {
    this.col = col;
    this.carrierPackage = item;
  }

  public hideInput() {
    this.carrierPackage = new CarrierPackage();
  }

  public backlist() {
    this.router.navigate(['/shipping/myshipping']);
  }
}
