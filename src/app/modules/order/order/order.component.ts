import {Component, OnDestroy, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {OrderCreate, OrderService} from '../../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../auth.service';
import {environment} from '../../../../environments/environment';
import {IOrder, IUser, OrderStatus} from "../../../models/interface";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class OrderComponent implements OnInit, OnDestroy {
  order: OrderCreate;
  orders: IOrder[];
  counts: { status: number, total: number }[];
  status: OrderStatus[] = [];
  totalItems = 0;
  modalRef: BsModalRef;
  errorMessage: string[] = [];
  sub: Subscription;
  handers: IUser[] = [];

  inputPhanCong = {id: null, hander: null, content_pc: ''};

  constructor(public orderService: OrderService, private modalService: BsModalService, public authService: AuthService,
              private router: Router) {
    this.counts = null;
  }

  ngOnInit() {
    this.searchOrders();
    this.getStatus();
    this.getHandles();
  }

  pageChanged(event: any): void {
    this.orderService.search.page = event.page;
    this.searchOrders();
  }

  public editOrder(id) {
    this.router.navigate([`/order/list/detail/${id}`]);
  }

  public searchOrders() {
    this.orderService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.orderService.getOrders()
      .subscribe(orders => {
        this.orders = orders.data.data;
        this.totalItems = orders.data.total;
        this.getCountByStatus();
      });
  }

  public genContentPc(value) {
    let staff = '';
    for (let i = 0; i < this.handers.length; i++) {
      if (this.handers[i].id === value.target.value) {
        staff = this.handers[i].name;
      }
    }
    this.inputPhanCong.content_pc = staff + ' thực hiện!';
  }

  public exportOrders() {
    this.orderService.showLoading(true);
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.orderService.exportOrders()
      .subscribe(data => {
        window.open(environment.backend + 'order/download/' + data.data, '_blank');
        this.orderService.showLoading(false);
      });
  }

  public getStatus() {
    this.orderService.showLoading(true);
    this.orderService.getStatus()
      .subscribe(orders => {
        this.status = orders.data;
        this.orderService.showLoading(false);
      });
  }

  public getHandles() {
    this.orderService.showLoading(true);
    this.orderService.getHandles()
      .subscribe(handers => {
        this.handers = handers.data;
        this.orderService.showLoading(false);
      });
  }

  public getCountByStatus() {
    this.orderService.showLoading(true);
    this.orderService.getCountByStatus()
      .subscribe(data => {
        this.counts = data.data;
        this.orderService.showLoading(false);
      });
  }

  openModal(template: TemplateRef<any>, order: IOrder) {
    this.inputPhanCong.id = order.id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmPc(): void {
    if (this.inputPhanCong.id > 0 && this.inputPhanCong.hander > 0) {
      this.orderService.postPc(this.inputPhanCong)
        .subscribe(res => {
          this.searchOrders();
          this.modalRef.hide();
        });
    }
  }

  declinePc(): void {
    this.modalRef.hide();
  }

  selectTab(status: string = null) {
    this.orderService.search.status = status;
    this.searchOrders();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
