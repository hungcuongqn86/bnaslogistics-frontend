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

  public editPartner(id) {
    this.router.navigate([`/muser/myshop/edit/${id}`]);
  }

  public deletePartner() {
    /*if (this.user) {
      this.user.is_deleted = 1;
      this.shopService.editUser(this.user)
        .subscribe(res => {
          this.searchShops();
        });
    }*/
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
    this.deletePartner();
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
