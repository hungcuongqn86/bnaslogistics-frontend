import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order, OrderCreate, OrderService, OrderStatus} from '../../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../../auth.service';
import {email_nv} from '../../../const';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MyorderComponent implements OnInit {
  order: OrderCreate;
  orders: Order[];
  counts: { status: number, total: number }[];
  status: OrderStatus[];
  modalRef: BsModalRef;
  totalItems = 0;
  inputDatCoc: { id: number; dc_percent_value: number; dc_value: number; content: string; tien_hang: number };
  errorMessage: string[] = [];
  arrDeposit = [];
  nv = false;

  constructor(public orderService: OrderService, private modalService: BsModalService, private route: ActivatedRoute,
              public auth: AuthService,
              private router: Router) {
    this.inputDatCoc = {id: 0, content: null, dc_percent_value: 80, dc_value: null, tien_hang: null};
    this.order = {
      id: null, user_id: null, shop_id: null, cart_ids: null, rate: 1, vip: null, vip_dc: 0, is_deleted: 0, created_at: '', updated_at: '',
      count_product: 0, count_link: 0, tien_hang: 0, phi_tam_tinh: 0, phi_dich_vu: 0, tong: 0
    };
    this.arrDeposit = this.auth.user.deposit.split(',');
    this.counts = null;
    this.route.params.subscribe(params => {
      if (params['status']) {
        const type = params['type'] ? params['type'] : '';
        this.selectTab(params['status'], type);
      }
    });
    this.nv = email_nv.includes(auth.user.email);
  }

  ngOnInit() {
    // this.getStatus();
  }

  pageChanged(event: any): void {
    this.orderService.search.page = event.page;
    this.searchOrders();
  }

  public editOrder(id) {
    const win = window.open(`./order/myorder/detail/${id}`, '_blank');
    win.focus();
  }

  public searchOrders() {
    this.orderService.showLoading(true);
    this.orderService.getMyOrders()
      .subscribe(orders => {
        this.orders = orders.data.data;
        this.totalItems = orders.data.total;
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

  selectTab(status: string = null, type: string = null) {
    this.orderService.search.status = '0';
    this.orderService.search.pk_status = '0';

    if (type === 'od') {
      this.orderService.search.status = status;
    }

    if (type === 'pk') {
      this.orderService.search.pk_status = status;
    }

    this.searchOrders();
  }

  openModal(template: TemplateRef<any>, order: Order) {
    this.inputDatCoc.id = order.id;
    this.inputDatCoc.tien_hang = order.tien_hang + order.phi_tam_tinh;
    this.calTienCoc();
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDatCoc(): void {
    this.orderService.showLoading(true);
    if (this.inputDatCoc.id > 0) {
      this.orderService.postDatCoc(this.inputDatCoc)
        .subscribe(res => {
          if (res.status) {
            this.searchOrders();
            this.orderService.showLoading(false);
            this.modalRef.hide();
          } else {
            this.errorMessage.push(res.message);
            this.orderService.showLoading(false);
          }
        });
    }
  }

  declineDatCoc(): void {
    this.modalRef.hide();
    this.errorMessage = [];
  }

  calTienCoc() {
    this.inputDatCoc.dc_value = Math.ceil(this.inputDatCoc.dc_percent_value * this.inputDatCoc.tien_hang / 100);
    const vnd = this.formatCurrency(this.inputDatCoc.dc_value.toString());
    this.inputDatCoc.content = `Đặt cọc ${this.inputDatCoc.dc_percent_value}%, tương đương ${vnd}(vnđ)`;
  }

  formatCurrency(number: string) {
    const n = number.split('').reverse().join('');
    const n2 = n.replace(/\d\d\d(?!$)/g, '$&,');
    return n2.split('').reverse().join('');
  }

  openDeleteModal(template: TemplateRef<any>, order: Order) {
    this.order = {
      id: order.id,
      user_id: order.user_id,
      shop_id: order.shop_id,
      cart_ids: null,
      rate: order.rate,
      vip: null,
      vip_dc: 0,
      is_deleted: order.is_deleted,
      created_at: order.created_at,
      updated_at: order.updated_at,
      count_product: order.count_product,
      count_link: order.count_link,
      tien_hang: order.tien_hang,
      phi_tam_tinh: order.phi_tam_tinh,
      phi_dich_vu: order.phi_dich_vu,
      tong: order.tong
    };
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDeleteOrder(): void {
    if (this.order) {
      this.order.is_deleted = 1;
      this.orderService.editOrder(this.order)
        .subscribe(res => {
          if (res.status) {
            this.searchOrders();
            this.modalRef.hide();
          } else {
            this.errorMessage.push(res.message);
          }
        });
    }
  }
}
