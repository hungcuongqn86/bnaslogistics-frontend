import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../../../../services/order/order.service';
import {OrderStatus, PackageStatus} from '../../../../models/interface';
import {Comment} from '../../../../models/Comment';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../auth.service';
import {email_nv} from '../../../../const';

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

  constructor(public orderService: OrderService, private route: ActivatedRoute, public auth: AuthService) {
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

  public reOrderOpenDialog(orderId: number): void {

  }
}
