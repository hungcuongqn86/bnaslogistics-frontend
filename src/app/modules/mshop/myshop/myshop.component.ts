import {Component, OnInit, ViewEncapsulation, TemplateRef, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {IShop} from '../../../models/interface';
import {ShopService} from '../../../services/mshop/shop.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-mshop-myshop',
  templateUrl: './myshop.component.html',
  styleUrls: ['./myshop.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MyshopComponent implements OnInit, OnDestroy {
  shop: IShop;
  shops: IShop[];
  totalItems = 0;
  modalRef: BsModalRef;
  sub: Subscription;

  constructor(public shopService: ShopService,
              private router: Router, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.searchShops();
  }

  pageChanged(event: any): void {
    this.shopService.search.page = event.page;
    this.searchShops();
  }

  public editShop(id) {
    this.router.navigate([`/mshop/myshop/edit/${id}`]);
  }

  public deleteShop() {
    if (this.shop) {
      this.shopService.showLoading(true);
      this.sub = this.shopService.deleteShop(this.shop)
        .subscribe(res => {
            this.searchShops();
          },
          error => {
            this.shopService.showLoading(false);
            this.sub.unsubscribe();
          });
    }
  }

  public searchShops() {
    this.shopService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.shopService.getMyShops()
      .subscribe(shops => {
          if (shops.status) {
            this.shops = shops.data.data;
            this.totalItems = shops.data.total;
          }

          this.shopService.showLoading(false);
          this.sub.unsubscribe();
        },
        error => {
          this.shopService.showLoading(false);
          this.sub.unsubscribe();
        });
  }

  gotoOrder(orderId: number) {
    const win = window.open(`./order/myorder/detail/${orderId}`, '_blank');
    win.focus();
  }

  openModal(template: TemplateRef<any>, item) {
    this.shop = item;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.deleteShop();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
