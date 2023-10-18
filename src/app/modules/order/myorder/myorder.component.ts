import {Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../../auth.service';
import {email_nv} from '../../../const';
import {History, IOrder, IVip, OrderStatus} from '../../../models/interface';
import {Order} from '../../../models/model';
import {forkJoin, Observable} from 'rxjs';
import {SettingService} from '../../../services/setting/setting.service';
import {ToastComponent} from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MyorderComponent implements OnInit {
  vip: IVip;
  order: IOrder;
  orders: IOrder[];
  counts: { status: number, total: number }[];
  status: OrderStatus[];
  modalRef: BsModalRef;
  totalItems = 0;
  inputDatCoc: { id: number; dc_percent_value: number; dc_value: number; content: string; tien_hang: number };
  errorMessage: string[] = [];
  arrDeposit = [];
  nv = false;
  stype = '';
  sstatus = '';

  @ViewChild('alert_toast') alert_toast: ToastComponent;
  position_toast = {X: 'Right', Y: 'Top'};
  toasts = [
    {title: 'Warning !', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning'},
    {title: 'Success !', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success'},
    {title: 'Error !', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger'},
    {title: 'Information !', content: 'Please read the comments carefully.', cssClass: 'e-toast-info'}];

  constructor(public orderService: OrderService, private settingService: SettingService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              public auth: AuthService,
              private router: Router) {
    this.inputDatCoc = {id: 0, content: null, dc_percent_value: 80, dc_value: null, tien_hang: null};
    this.order = new Order();
    // this.vip = new Vip();
    this.arrDeposit = this.auth.user.deposit.split(',');
    this.counts = null;
    this.route.params.subscribe(params => {
      if (params['status']) {
        this.stype = params['type'] ? params['type'] : '';
        this.sstatus = params['status'] ? params['status'] : '';
        this.selectTab(this.sstatus, this.stype);
      }
    });
    this.nv = email_nv.includes(auth.user.email);
  }

  ngOnInit() {
    this.getStatus();
  }

  pageChanged(event: any): void {
    this.orderService.search.page = event.page;
    this.searchOrders();
  }

  public editOrder(id) {
    this.router.navigate([`/order/myorder`, this.sstatus, this.stype, `detail`, id]);
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

  public selectTab(status: string = null, type: string = null) {
    this.orderService.search.status = '0';
    this.orderService.search.pk_status = '0';
    this.orderService.search.type = type;

    if (type === 'od') {
      this.orderService.search.status = status;
    }

    if (type === 'pk') {
      this.orderService.search.pk_status = status;
    }

    this.searchOrders();
  }

  public datCoc(template: TemplateRef<any>, order: IOrder) {
    this.orderService.showLoading(true);

    const getOrderObs: Observable<any> = this.orderService.getOrder(order.id);
    // const getVipObs: Observable<any> = this.settingService.getVip(this.auth.user.vip);

    const listSub = forkJoin([
      getOrderObs,
      // getVipObs
    ]).subscribe(([rorder]) => {
      this.order = rorder.data;
      // this.vip = vip.data;
      this.orderService.showLoading(false);
      listSub.unsubscribe();
      this.openDatCocModal(template);
    });
  }

  private openDatCocModal(template: TemplateRef<any>) {
    this.inputDatCoc.id = this.order.id;
    this.inputDatCoc.tien_hang = this.order.tien_hang + this.order.phi_kiem_dem_tt + this.order.phi_dat_hang_tt;
    this.inputDatCoc.dc_percent_value = this.order.deposit;
    this.calTienCoc();
    this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
  }

  private calTienCoc() {
    this.inputDatCoc.dc_value = Math.ceil(this.inputDatCoc.dc_percent_value * this.inputDatCoc.tien_hang / 100);
    const vnd = this.formatCurrency(this.inputDatCoc.dc_value.toString());
    this.inputDatCoc.content = `Đặt cọc ${this.inputDatCoc.dc_percent_value}%, tương đương ${vnd}(vnđ)`;
  }

  public confirmDatCoc(): void {
    this.orderService.showLoading(true);
    if (this.inputDatCoc.id > 0) {
      this.orderService.postDatCoc(this.inputDatCoc)
        .subscribe(res => {
          if (res.status) {
            this.alert_toast.show({
              title: 'Success !',
              content: 'Đặt cọc thành công!',
              cssClass: 'e-toast-success'
            });

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

  public declineDatCoc(): void {
    this.modalRef.hide();
    this.errorMessage = [];
  }


  private formatCurrency(number: string) {
    const n = number.split('').reverse().join('');
    const n2 = n.replace(/\d\d\d(?!$)/g, '$&,');
    return n2.split('').reverse().join('');
  }

  public openDeleteModal(template: TemplateRef<any>, order: IOrder) {
    this.order = order;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirmDeleteOrder(): void {
    if (this.order) {
      this.errorMessage = [];
      this.orderService.postDelete(this.order.id)
        .subscribe(res => {
          if (res.status) {
            this.errorMessage = [];
            this.searchOrders();
            this.modalRef.hide();
          } else {
            for (let i = 0; i < res.data.length; i++) {
              this.errorMessage.push(res.data[i]);
            }
          }
        });
    }
  }
}
