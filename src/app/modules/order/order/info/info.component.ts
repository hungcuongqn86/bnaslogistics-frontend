import {AfterViewChecked, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OrderService} from '../../../../services/order/order.service';
import {IOrderItem, IPackage, OrderStatus, PackageStatus} from '../../../../models/interface';
import {Comment} from '../../../../models/Comment';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {OrderItem, Package} from '../../../../models/model';

@Component({
  selector: 'app-order-detail-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit, AfterViewChecked {
  modalRef: BsModalRef;
  status: OrderStatus[];
  pkStatus: PackageStatus[];
  package: IPackage;
  orderItem: IOrderItem;
  comment: Comment;
  comments: Comment[];
  errorMessage: string[] = [];
  col: string;
  editPhiCanNangDk = false;
  editPhiDonggo1Dk = false;
  editPhiDonggo1TtDk = false;
  editPhiDonggo2Dk = false;

  editPhiChongsoc1Dk = false;
  editPhiChongsoc2Dk = false;
  editPhiChongSocTtDk = false;

  editPhiKiemDem = false;
  editPhiDichVu = false;
  editTigia = false;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(public orderService: OrderService, private route: ActivatedRoute,
              public authService: AuthService, private modalService: BsModalService) {
    this.reNewPackage();
    this.reNewOrder();
    this.comment = {
      id: null,
      order_id: null,
      user_id: null,
      user_name: null,
      content: null,
      is_admin: 1,
      created_at: null
    };
    this.getStatus();
    this.getPkStatus();
    this.getChat();
  }

  reNewOrder() {
    this.orderItem = new OrderItem();
  }

  reNewPackage() {
    this.package = new Package();
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

  public gotoCarrier(itemId: number) {
    const win = window.open(`./shipping/list/detail/${itemId}`, '_blank');
    win.focus();
  }

  public getStatus() {
    this.orderService.showLoading(true);
    this.orderService.getStatus()
      .subscribe(orders => {
        this.status = orders.data;
        this.orderService.showLoading(false);
      });
  }

  public getChat() {
    this.orderService.getComments(this.orderService.orderRe.id)
      .subscribe(data => {
        this.comments = data.data;
        this.setIsRead();
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

  public addPackage() {
    this.orderService.showLoading(true);
    this.orderService.addPackage(this.orderService.orderRe.id)
      .subscribe(res => {
        this.getOrder();
      });
  }

  public deletePackage(template: TemplateRef<any>, item: IPackage) {
    this.orderService.showLoading(true);
    this.orderService.deletePackage(item)
      .subscribe(res => {
        if (res.status) {
          this.getOrder();
        } else {
          this.errorMessage = res.data;
          this.openErrorModal(template);
          this.getOrder();
        }
      });
  }

  public getOrder() {
    this.orderService.getOrder(this.orderService.orderRe.id)
      .subscribe(order => {
        this.orderService.orderRe = order.data;
        this.orderService.orderRe.tong_tien_can_dk = Number(this.orderService.orderRe.tien_can_dk) +
          Number(this.orderService.orderRe.tien_dong_go_dk) +
          Number(this.orderService.orderRe.tien_chong_soc_dk);
        this.orderService.showLoading(false);
      });
  }

  public selectPackage(item: IPackage, firt: number, col: string) {
    this.col = col;
    this.package = item;
  }

  public updatePackage(template: TemplateRef<any>, dirty: string) {
    this.orderService.showLoading(true);
    this.orderService.editPackage(this.package, dirty)
      .subscribe(res => {
        if (res.status) {
          this.getOrder();
        } else {
          this.errorMessage = res.data;
          this.openErrorModal(template);
          this.getOrder();
        }
      });
  }

  public hideInput() {
    this.reNewPackage();
    this.reNewOrder();
  }

  public selectOrderItem(item: IOrderItem, col: string) {
    if (this.authService.hasRole('admin') || (this.authService.user.id === this.orderService.orderRe.handle.id)) {
      this.col = col;
      this.orderItem = item;
    }
  }

  public phiCanNangDkEdit(status: boolean) {
    if (this.authService.hasRole('admin') || (this.authService.user.id === this.orderService.orderRe.handle.id)) {
      this.editPhiCanNangDk = status;
    }
  }

  public phiDonggo1DkEdit(status: boolean) {
    if (this.authService.hasRole('admin') || (this.authService.user.id === this.orderService.orderRe.handle.id)) {
      this.editPhiDonggo1Dk = status;
    }
  }

  public phiDonggo1TtDkEdit(status: boolean) {
    if (this.authService.hasRole('admin') || (this.authService.user.id === this.orderService.orderRe.handle.id)) {
      this.editPhiDonggo1TtDk = status;
    }
  }

  public phiDonggo2DkEdit(status: boolean) {
    if (this.authService.hasRole('admin') || (this.authService.user.id === this.orderService.orderRe.handle.id)) {
      this.editPhiDonggo2Dk = status;
    }
  }

  public phiChongSoc1DkEdit(status: boolean) {
    if (this.authService.hasRole('admin') || (this.authService.user.id === this.orderService.orderRe.handle.id)) {
      this.editPhiChongsoc1Dk = status;
    }
  }

  public phiChongSoc2DkEdit(status: boolean) {
    if (this.authService.hasRole('admin') || (this.authService.user.id === this.orderService.orderRe.handle.id)) {
      this.editPhiChongsoc2Dk = status;
    }
  }

  public phiChongSocTtDkEdit(status: boolean) {
    if (this.authService.hasRole('admin') || (this.authService.user.id === this.orderService.orderRe.handle.id)) {
      this.editPhiChongSocTtDk = status;
    }
  }

  public phiKiemDemEdit(status: boolean) {
    if (this.authService.hasRole('admin') || (this.authService.user.id === this.orderService.orderRe.handle.id)) {
      this.editPhiKiemDem = status;
    }
  }

  public phiDichVuEdit(status: boolean) {
    if (this.authService.hasRole('admin') || (this.authService.user.id === this.orderService.orderRe.handle.id)) {
      this.editPhiDichVu = status;
    }
  }

  public tigiaEdit(status: boolean) {
    if (this.authService.hasRole('admin') || (this.authService.user.id === this.orderService.orderRe.handle.id)) {
      this.editTigia = status;
    }
  }

  public updateOrder(template: TemplateRef<any>, dirty: string) {
    this.orderService.showLoading(true);
    this.orderService.editOrder(this.orderService.orderRe, dirty)
      .subscribe(res => {
        if (res.status) {
          this.getOrder();
        } else {
          this.errorMessage = res.data;
          this.openErrorModal(template);
          this.getOrder();
        }
      });
  }

  public editOrderConfirm(template: TemplateRef<any>, dirty: string): void {
    this.orderService.showLoading(true);
    this.orderService.editOrderItem(this.orderItem, dirty)
      .subscribe(res => {
        if (res.status) {
          this.getOrder();
        } else {
          this.errorMessage = res.data;
          this.openErrorModal(template);
          this.getOrder();
        }
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

  private setIsRead() {
    this.orderService.setIsRead(this.orderService.orderRe.id)
      .subscribe(data => {
      });
  }

  public confirmOrderOpenDialog(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  public confirmOrder(): void {
    this.orderService.showLoading(true);
    const history = {
      id: null,
      user_name: null,
      content: 'Xác nhận đơn hàng!',
      type: 12,
      created_at: null,
      is_deleted: 0,
      order_id: this.orderService.orderRe.id,
      updated_at: null,
      user_id: null
    };
    this.orderService.postHistory(history)
      .subscribe(res => {
        if (res.status) {
          this.orderService.showLoading(false);
          this.modalRef.hide();
          this.getOrder();
        } else {
          this.errorMessage.push(res.message);
          this.orderService.showLoading(false);
        }
      });
  }

  public decline(): void {
    this.modalRef.hide();
  }

  openErrorModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  declineError(): void {
    this.modalRef.hide();
  }
}
