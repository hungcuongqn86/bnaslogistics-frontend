import {AfterViewChecked, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OrderService} from '../../../../services/order/order.service';
import {Package, PackageStatus} from '../../../../models/Package';
import {Comment} from '../../../../models/Comment';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {IOrderItem, OrderStatus} from "../../../../models/interface";
import {OrderItem} from "../../../../models/model";

@Component({
  selector: 'app-order-detail-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit, AfterViewChecked {
  modalRef: BsModalRef;
  status: OrderStatus[];
  pkStatus: PackageStatus[];
  package: Package;
  orderItem: IOrderItem;
  comment: Comment;
  comments: Comment[];
  errorMessage: string[] = [];
  col: string;
  editPhiKiemDem = false;
  editPhiDichVu = false;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(public orderService: OrderService, private route: ActivatedRoute,
              public authService: AuthService, private modalService: BsModalService) {
    this.reNewPackage();
    this.reNewCart();
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
    this.route.params.subscribe(params => {
      this.getChat();
    });
  }

  reNewCart() {
    this.orderItem = new OrderItem();
  }

  reNewPackage() {
    this.package = {
      id: null,
      is_deleted: null,
      contract_code: null,
      ship_khach: null,
      ship_tt: null,
      tra_shop: null,
      thanh_toan: null,
      created_at: null,
      order_id: null,
      order: null,
      package_code: null,
      status: null,
      note_tl: null,
      weight: null,
      weight_qd: null,
      tien_can: null,
      gia_can: null,
      tien_thanh_ly: null,
      phi_van_phat_sinh: null,
      updated_at: null,
      bill_id: null
    };
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

  public deletePackage(item: Package) {
    this.orderService.showLoading(true);
    item.is_deleted = 1;
    this.orderService.editPackage(item)
      .subscribe(res => {
        this.getOrder();
      });
  }

  public getOrder() {
    this.orderService.getOrder(this.orderService.orderRe.id)
      .subscribe(order => {
        this.orderService.orderRe = order.data;
        this.orderService.showLoading(false);
      });
  }

  public selectPackage(item: Package, firt: number, col: string) {
    /*this.col = col;
    this.package = item;
    if (firt === 0) {
      let traShop = 0;
      if (this.orderService.orderRe.cart) {
        for (let i = 0; i < this.orderService.orderRe.cart.length; i++) {
          const arrPrice = this.orderService.orderRe.cart[i].price.split('-');
          traShop = traShop + (Number(arrPrice[0]) * this.orderService.orderRe.cart[i].amount);
        }
      }
      this.package.tra_shop = traShop;
    }*/
  }

  public updatePackage(template: TemplateRef<any>) {
    this.orderService.showLoading(true);
    this.orderService.editPackage(this.package)
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
    this.reNewCart();
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

  public updateOrder(dirty: string) {
    this.orderService.showLoading(true);
    this.orderService.editOrder(this.orderService.orderRe)
      .subscribe(res => {
        this.updatePak();
      });
  }

  private updatePak() {
    this.orderService.editPackage(this.orderService.orderRe.package[0])
      .subscribe(res => {
        this.getOrder();
      });
  }

  public editOrderConfirm(dirty: string): void {
    this.orderService.showLoading(true);
    this.orderService.editOrderItem(this.orderItem, dirty)
      .subscribe(res => {
        this.getOrder();
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
