import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart/cart.service';
import {OrderCreate, OrderService} from '../../services/order/order.service';
import {Shop} from '../../models/Shop';
import {Cart} from '../../models/Cart';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../auth.service';
import {ErrorMessagesService} from '../../error.messages.service';
import {email_nv} from '../../const';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CartComponent implements OnInit {
  shops: Shop[];
  shop: Shop;
  cart: Cart;
  order: OrderCreate;
  modalRef: BsModalRef;
  nv = false;

  constructor(public cartService: CartService, private authService: AuthService, private orderService: OrderService,
              public errorMessagesService: ErrorMessagesService,
              private router: Router, private modalService: BsModalService) {
    this.nv = email_nv.includes(authService.user.email);
  }

  ngOnInit() {
    this.getCarts();
    this.order = {
      id: null, user_id: null, shop_id: null, cart_ids: null, rate: 1, is_deleted: 0, created_at: '', updated_at: '',
      count_product: 0, count_link: 0, tien_hang: 0, phi_tam_tinh: 0, phi_dich_vu: 0, tong: 0
    };
  }

  public getCarts() {
    this.cartService.showLoading(true);
    this.cartService.getCartWithShops()
      .subscribe(shops => {
        this.shops = this.convertShopsData(shops.data);
        this.cartService.showLoading(false);
      });
  }

  private convertShopsData(data: Shop[]) {
    let phi_dich_vu = this.authService.user.cost_percent;
    const res: Shop[] = [];
    for (let i = 0; i < data.length; i++) {
      const shop: Shop = data[i];
      const detailData = shop.cart;
      shop.count_link = shop.cart.length;
      shop.count_product = 0;
      shop.tien_hang = 0;
      for (let j = 0; j < detailData.length; j++) {
        shop.count_product = shop.count_product + detailData[j].amount;
        const ndt = parseFloat(detailData[j].price);
        const tigia = parseFloat(detailData[j].rate);
        const soluong = detailData[j].amount;
        const vnd = Math.ceil(ndt * tigia * soluong);
        shop.tien_hang = shop.tien_hang + vnd;
      }
      // Phi dich vu theo tien hang
      phi_dich_vu = this.getPhiDichVu(shop.tien_hang);
      shop.phi_tam_tinh = Math.ceil((shop.tien_hang * phi_dich_vu) / 100);

      shop.tong = shop.tien_hang + shop.phi_tam_tinh;
      res.push(shop);
    }
    return res;
  }

  private getPhiDichVu(tienhang: number) {
    let phi_dich_vu = this.authService.user.cost_percent;
    // Phi dich vu theo tien hang
    if (tienhang < 2000000) {
      phi_dich_vu = 5;
    }
    if ((tienhang >= 2000000) && (tienhang <= 10000000)) {
      phi_dich_vu = 2.5;
    }
    if (tienhang > 10000000) {
      phi_dich_vu = 1;
    }
    return phi_dich_vu;
  }

  public ketDon(item: Shop) {
    this.cartService.showLoading(true);
    this.order.shop_id = item.id;
    this.order.rate = item.rate;
    this.order.count_product = item.count_product;
    this.order.count_link = item.count_link;
    this.order.tien_hang = item.tien_hang;
    this.order.phi_dich_vu = this.getPhiDichVu(item.tien_hang);
    this.order.phi_tam_tinh = item.phi_tam_tinh;
    this.order.tong = item.tong;

    const cartids = [];
    for (let j = 0; j < item.cart.length; j++) {
      cartids.push(item.cart[j].id);
    }
    this.order.cart_ids = cartids.join(',');
    this.cartService.updateMultipleCart(item.cart)
      .subscribe(res => {
        this.orderService.addOrder(this.order)
          .subscribe(order => {
            if (order.status) {
              this.getCarts();
            } else {
              this.getCarts();
              this.cartService.showLoading(false);
              this.errorMessagesService.message = order.message;
              this.errorMessagesService.messages = order.data;
              this.errorMessagesService.errorModalShown = true;
            }
          });
      });
  }

  public ketDonTatCa() {
  }

  openModalDeleteCart(template: TemplateRef<any>, cart: Cart) {
    this.cart = cart;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDeleteCart(): void {
    this.deleteCart();
    this.modalRef.hide();
  }

  declineDeleteCart(): void {
    this.modalRef.hide();
  }

  public deleteCart() {
    if (this.cart) {
      this.cart.is_deleted = 1;
      this.cartService.updateCart(this.cart)
        .subscribe(res => {
          this.getCarts();
        });
    }
  }

  updateCart(cart: Cart) {
    this.cartService.showLoading(true);
    this.cartService.updateCart(cart)
      .subscribe(res => {
        this.getCarts();
      });
  }

  openModalDeleteShop(template: TemplateRef<any>, shop: Shop) {
    this.shop = shop;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDeleteShop(): void {
    this.deleteCartOfShop();
    this.modalRef.hide();
  }

  declineDeleteShop(): void {
    this.modalRef.hide();
  }

  public deleteCartOfShop() {
    if (this.shop) {
      const arrId = [];
      for (let i = 0; i < this.shop.cart.length; i++) {
        arrId.push(this.shop.cart[i].id);
      }
      this.cartService.deleteCart(arrId.join(','))
        .subscribe(res => {
          this.getCarts();
        });
    }
  }
}
