import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart/cart.service';
import {OrderCreate, OrderService} from '../../services/order/order.service';
import {Cart} from '../../models/Cart';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../auth.service';
import {ErrorMessagesService} from '../../error.messages.service';
import {email_nv} from '../../const';
import {ICart, ICartItem} from "../../models/interface";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CartComponent implements OnInit {
  carts: ICart[];
  cart: ICart;
  cartItem: ICartItem;
  order: OrderCreate;
  modalRef: BsModalRef;
  nv = false;
  vipData = [0, 5, 10, 15, 20, 25, 30];

  constructor(public cartService: CartService, private authService: AuthService, private orderService: OrderService,
              public errorMessagesService: ErrorMessagesService,
              private router: Router, private modalService: BsModalService) {
    this.nv = email_nv.includes(authService.user.email);
  }

  ngOnInit() {
    this.getCarts();
    this.order = {
      id: null,
      user_id: null,
      shop_id: null,
      cart_ids: null,
      rate: 1,
      vip: null,
      vip_dc: 0,
      is_deleted: 0,
      created_at: '',
      updated_at: '',
      count_product: 0,
      count_link: 0,
      tien_hang: 0,
      phi_tam_tinh: 0,
      phi_dich_vu: 0,
      tong: 0
    };
  }

  public getCarts() {
    this.cartService.showLoading(true);
    this.cartService.getCartWithShops()
      .subscribe(carts => {
        this.carts = this.convertCartData(carts.data);
        this.cartService.showLoading(false);
      });
  }

  private convertCartData(data: ICart[]) {
    const vip = this.authService.user.vip ? this.authService.user.vip : '0';
    const vipdc = this.vipData[vip];

    let phi_dich_vu = this.authService.user.cost_percent;
    const res: ICart[] = [];
    for (let i = 0; i < data.length; i++) {
      const cart: ICart = data[i];
      const detailData = cart.cart_items;
      cart.count_link = detailData.length;
      cart.vip = vip;
      cart.vip_dc = vipdc;
      cart.count_product = 0;
      cart.tien_hang = 0;
      for (let j = 0; j < detailData.length; j++) {
        cart.count_product = cart.count_product + detailData[j].amount;
        const ndt = parseFloat(detailData[j].price);
        const tigia = parseFloat(detailData[j].rate);
        const soluong = detailData[j].amount;
        const vnd = Math.ceil(ndt * tigia * soluong);
        cart.tien_hang = cart.tien_hang + vnd;
      }
      // Phi dich vu theo tien hang
      phi_dich_vu = this.getPhiDichVu(cart.tien_hang);
      cart.phi_tam_tinh = Math.ceil((cart.tien_hang * phi_dich_vu) / 100);
      cart.phi_tam_tinh = cart.phi_tam_tinh - Math.ceil((cart.phi_tam_tinh * cart.vip_dc) / 100);

      cart.tong = cart.tien_hang + cart.phi_tam_tinh;
      res.push(cart);
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

  public ketDon(item: ICart) {
    this.cartService.showLoading(true);
    this.order.shop_id = item.id;
    this.order.rate = item.rate;
    this.order.count_product = item.count_product;
    this.order.count_link = item.count_link;
    this.order.tien_hang = item.tien_hang;
    this.order.phi_dich_vu = this.getPhiDichVu(item.tien_hang);
    this.order.phi_tam_tinh = item.phi_tam_tinh;
    this.order.tong = item.tong;
    this.order.vip = item.vip;
    this.order.vip_dc = item.vip_dc;

    const cartids = [];
    for (let j = 0; j < item.cart_items.length; j++) {
      cartids.push(item.cart_items[j].id);
    }
    this.order.cart_ids = cartids.join(',');
    this.cartService.updateMultipleCart(item.cart_items)
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

  openModalDeleteCart(template: TemplateRef<any>, cartItem: ICartItem) {
    this.cartItem = cartItem;
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
    if (this.cartItem) {
      this.cartItem.is_deleted = 1;
      this.cartService.updateCart(this.cartItem)
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

  openModalDeleteShop(template: TemplateRef<any>, cart: ICart) {
    this.cart = cart;
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
    if (this.cart) {
      const arrId = [];
      for (let i = 0; i < this.cart.cart_items.length; i++) {
        arrId.push(this.cart.cart_items[i].id);
      }
      this.cartService.deleteCart(arrId.join(','))
        .subscribe(res => {
          this.getCarts();
        });
    }
  }
}
