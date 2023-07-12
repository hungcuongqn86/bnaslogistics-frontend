import {AfterViewChecked, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OrderService} from '../../../../services/order/order.service';
import {IOrder, OrderStatus, PackageStatus} from '../../../../models/interface';
import {Comment} from '../../../../models/Comment';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../auth.service';
import {email_nv} from '../../../../const';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {forkJoin, Observable} from 'rxjs';
import {Order} from '../../../../models/model';

@Component({
  selector: 'app-myorder-detail-info',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.css']
})

export class MyinfoComponent implements OnInit, AfterViewChecked {
  status: OrderStatus[];
  pkStatus: PackageStatus[];
  comment: Comment;
  comments: Comment[];
  nv = false;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  modalRef: BsModalRef;
  inputDatCoc: { id: number; dc_percent_value: number; dc_value: number; content: string; tien_hang: number };
  order: IOrder;
  errorMessage: string[] = [];

  constructor(public orderService: OrderService, private route: ActivatedRoute,
              private router: Router,
              private modalService: BsModalService,
              public auth: AuthService) {
    this.inputDatCoc = {id: 0, content: null, dc_percent_value: 80, dc_value: null, tien_hang: null};
    this.order = new Order();
    this.comment = {
      id: null,
      order_id: null,
      user_id: null,
      user_name: null,
      content: null,
      is_admin: 0,
      created_at: null
    };
    this.getStatus();
    this.getPkStatus();
    this.route.params.subscribe(params => {
      this.getChat();
    });
    this.nv = email_nv.includes(auth.user.email);
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  public getChat() {
    this.orderService.getComments(this.orderService.orderRe.id)
      .subscribe(data => {
        this.comments = data.data;
        this.setIsRead();
      });
  }

  private setIsRead() {
    this.orderService.setIsRead(this.orderService.orderRe.id)
      .subscribe(data => {
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

  public getPkStatus() {
    this.orderService.showLoading(true);
    this.orderService.getPkStatus()
      .subscribe(pks => {
        this.pkStatus = pks.data;
        this.orderService.showLoading(false);
      });
  }

  public addComment(): void {
    if (this.comment.content) {
      this.orderService.addComments({
        order_id: this.orderService.orderRe.id,
        content: this.comment.content,
        is_admin: this.comment.is_admin
      })
        .subscribe(res => {
          this.comment.content = null;
          this.getChat();
        });
    }
  }

  public gotoCarrier(itemId: number) {
    const win = window.open(`./shipping/myshipping/edit/${itemId}`, '_blank');
    win.focus();
  }

  private getOrder() {
    if (this.orderService.orderRe.id !== null) {
      this.orderService.showLoading(true);
      this.orderService.getOrder(this.orderService.orderRe.id)
        .subscribe(order => {
          this.orderService.orderRe = order.data;
          this.orderService.showLoading(false);
        });
    }
  }

  public reOrderOpenDialog(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public decline(): void {
    this.modalRef.hide();
  }

  public confirmReOrder(): void {
    if (this.orderService.orderRe.id !== null) {
      this.orderService.showLoading(true);
      this.orderService.reOrder(this.orderService.orderRe.id)
        .subscribe(order => {
          this.orderService.showLoading(false);
          if (order.status) {
            this.router.navigate([`/order/myorder/0/od`]);
          }
        });
    }
    this.modalRef.hide();
  }

  public datCoc(template: TemplateRef<any>, order: IOrder) {
    this.orderService.showLoading(true);
    const getOrderObs: Observable<any> = this.orderService.getOrder(order.id);
    const listSub = forkJoin([
      getOrderObs,
    ]).subscribe(([rorder]) => {
      this.order = rorder.data;
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

  private formatCurrency(number: string) {
    const n = number.split('').reverse().join('');
    const n2 = n.replace(/\d\d\d(?!$)/g, '$&,');
    return n2.split('').reverse().join('');
  }

  public reloadOrder() {
    this.orderService.showLoading(true);
    if (this.orderService.orderRe.id !== null) {
      this.orderService.getOrder(this.orderService.orderRe.id)
        .subscribe(order => {
          this.orderService.orderRe = order.data;
          this.orderService.orderRe.tong_tien_can_dk = Number(this.orderService.orderRe.tien_can_dk) +
            Number(this.orderService.orderRe.tien_dong_go_dk) +
            (Number(this.orderService.orderRe.tien_chong_soc_dk) * this.orderService.orderRe.ti_gia);
          this.genBangphi();
          this.orderService.showLoading(false);
        });
    }
  }

  private genBangphi() {
    this.orderService.bang_phi = {
      tong_can_nang: 0, tong_can_nang_qd: 0, tong_tien_can: 0,
      tong_kich_thuoc: 0,
      tong_tien_chong_soc: 0,
      tong_tien_dong_go: 0,
      phi_van_phat_sinh: 0
    };

    for (let i = 0; i < this.orderService.orderRe.package.length; i++) {
      this.orderService.bang_phi.tong_can_nang = Number(this.orderService.bang_phi.tong_can_nang)
        + Number(this.orderService.orderRe.package[i].weight);
      this.orderService.bang_phi.tong_can_nang = Math.round(this.orderService.bang_phi.tong_can_nang * 100) / 100;

      this.orderService.bang_phi.tong_can_nang_qd = Number(this.orderService.bang_phi.tong_can_nang_qd)
        + Number(this.orderService.orderRe.package[i].weight_qd);
      this.orderService.bang_phi.tong_can_nang_qd = Math.round(this.orderService.bang_phi.tong_can_nang_qd * 100) / 100;

      this.orderService.bang_phi.tong_kich_thuoc = Number(this.orderService.bang_phi.tong_kich_thuoc)
        + Number(this.orderService.orderRe.package[i].size);
      this.orderService.bang_phi.tong_kich_thuoc = Math.round(this.orderService.bang_phi.tong_kich_thuoc * 100) / 100;

      this.orderService.bang_phi.tong_tien_can = Number(this.orderService.bang_phi.tong_tien_can)
        + Number(this.orderService.orderRe.package[i].tien_can_tt);
      this.orderService.bang_phi.tong_tien_can = Math.round(this.orderService.bang_phi.tong_tien_can * 100) / 100;

      this.orderService.bang_phi.tong_tien_dong_go = Number(this.orderService.bang_phi.tong_tien_dong_go)
        + Number(this.orderService.orderRe.package[i].tien_dong_go);
      this.orderService.bang_phi.tong_tien_dong_go = Math.round(this.orderService.bang_phi.tong_tien_dong_go * 100) / 100;

      this.orderService.bang_phi.tong_tien_chong_soc = Number(this.orderService.bang_phi.tong_tien_chong_soc)
        + Number(this.orderService.orderRe.package[i].tien_chong_soc_tt);
      this.orderService.bang_phi.tong_tien_chong_soc = Math.round(this.orderService.bang_phi.tong_tien_chong_soc * 100) / 100;

      this.orderService.bang_phi.phi_van_phat_sinh = Number(this.orderService.bang_phi.phi_van_phat_sinh)
        + Number(this.orderService.orderRe.package[i].phi_van_phat_sinh);
      this.orderService.bang_phi.phi_van_phat_sinh = Math.round(this.orderService.bang_phi.phi_van_phat_sinh * 100) / 100;
    }
  }

  public confirmDatCoc(): void {
    this.orderService.showLoading(true);
    if (this.inputDatCoc.id > 0) {
      this.orderService.postDatCoc(this.inputDatCoc)
        .subscribe(res => {
          if (res.status) {
            this.orderService.showLoading(false);
            this.modalRef.hide();
            this.reloadOrder();
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
}
