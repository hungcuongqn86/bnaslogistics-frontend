import {AfterViewChecked, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OrderService} from '../../../../services/order/order.service';
import {IOrderItem, IPackage, OrderStatus, PackageStatus} from '../../../../models/interface';
import {Comment} from '../../../../models/Comment';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {OrderItem, Package} from "../../../../models/model";

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
    if (!this.authService.hasRole('employees') || (col === 'nv_note')) {
      this.col = col;
      this.orderItem = item;
    }
  }

  public phiKiemDemEdit(status: boolean) {
    if (!this.authService.hasRole('employees')) {
      this.editPhiKiemDem = status;
    }
  }

  public phiDichVuEdit(status: boolean) {
    if (!this.authService.hasRole('employees')) {
      this.editPhiDichVu = status;
    }
  }

  public tigiaEdit(status: boolean) {
    if (!this.authService.hasRole('employees')) {
      this.editTigia = status;
    }
  }

  public updateOrder(dirty: string) {
    this.orderService.showLoading(true);
    this.orderService.editOrder(this.orderService.orderRe, dirty)
      .subscribe(res => {
        if (res.status) {
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

  openErrorModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  declineError(): void {
    this.modalRef.hide();
  }
}
