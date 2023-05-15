import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart/cart.service';
import {OrderService} from '../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../auth.service';
import {ErrorMessagesService} from '../../error.messages.service';
import {email_nv} from '../../const';
import {ICart, ICartItem, IOrder} from '../../models/interface';
import {Cart, CartItem, Order} from '../../models/model';

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
  order: IOrder;
  modalRef: BsModalRef;
  nv = false;

  constructor(public cartService: CartService, private authService: AuthService, private orderService: OrderService,
              public errorMessagesService: ErrorMessagesService,
              private router: Router, private modalService: BsModalService) {
    this.nv = email_nv.includes(authService.user.email);
  }

  ngOnInit() {
    this.getCarts();
    this.order = new Order();
  }

  public getCarts() {
    this.cartService.showLoading(true);
    this.cartService.getCartWithShops()
      .subscribe(carts => {
        this.carts = carts.data;
        this.cartService.showLoading(false);
      });
  }

  public ketDon(item: ICart, template: TemplateRef<any>) {
    this.cartService.showLoading(true);
    this.orderService.addOrder(item)
      .subscribe(order => {
        if (order.status) {
          this.getCarts();
          this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
        } else {
          this.getCarts();
          this.cartService.showLoading(false);
          this.errorMessagesService.message = order.message;
          this.errorMessagesService.messages = order.data;
          this.errorMessagesService.errorModalShown = true;
        }
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
      this.cartService.deleteCartItem(this.cartItem.id)
        .subscribe(res => {
          this.getCarts();
        });
    }
  }

  updateCart(cart: ICart) {
    this.cartService.showLoading(true);
    this.cartService.updateCart(cart)
      .subscribe(res => {
        this.getCarts();
      });
  }

  updateCartItem(cartItem: ICartItem) {
    this.cartService.showLoading(true);
    this.cartService.updateCartItem(cartItem)
      .subscribe(res => {
        this.getCarts();
      });
  }

  openModalDeleteShop(template: TemplateRef<any>, cart: ICart) {
    this.cart = cart;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDeleteShop(): void {
    if (this.cart) {
      this.cartService.deleteCart(this.cart.id)
        .subscribe(res => {
          this.getCarts();
        });
    }
    this.modalRef.hide();
  }

  declineDeleteShop(): void {
    this.modalRef.hide();
  }

  openModalAddCart(template: TemplateRef<any>) {
    this.cart = new Cart();
    this.addCartItem();
    this.addCartItem();
    this.addCartItem();
    this.modalRef = this.modalService.show(template, {class: 'modal-xl'});
  }

  addCartItem() {
    const newItem = new CartItem();
    this.cart.cart_items.push(newItem);
  }

  addCartConfirm(): void {
    if (this.cart) {
      this.cartService.storeCart(this.cart)
        .subscribe(res => {
          this.getCarts();
        });
    }
    this.modalRef.hide();
  }

  addCartDecline(): void {
    this.modalRef.hide();
  }
}
