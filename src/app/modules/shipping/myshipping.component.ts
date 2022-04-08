import {Component, TemplateRef} from '@angular/core';
import {ShippingService} from '../../services/shipping/shipping.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../auth.service';
import {Router} from "@angular/router";
import {ICarrier} from "../../models/interface";

@Component({
  selector: 'app-shipping',
  templateUrl: './myshipping.component.html',
  styleUrls: ['./myshipping.component.css']
})

export class MyshippingComponent {
  shippings: ICarrier[] = [];
  modalRef: BsModalRef;
  title = '';
  totalItems = 0;

  constructor(public shippingService: ShippingService, public authService: AuthService, private modalService: BsModalService, private router: Router) {
    this.getMyShippings();
  }

  public getMyShippings() {
    this.shippingService.showLoading(true);
    this.shippingService.getMyShippings()
      .subscribe(shippings => {
        this.shippings = shippings.data.data;
        this.totalItems = shippings.data.total;
        this.shippingService.showLoading(false);
      });
  }

  pageChanged(event: any): void {
    this.shippingService.search.page = event.page;
    this.getMyShippings();
  }

  public addShipping() {
    this.router.navigate([`/shipping/myshipping/add`]);
  }

  public editShipping(id: number) {
    this.router.navigate([`/shipping/myshipping/edit/${id}`]);
  }

  public confirm() {
    /*this.shippingService.showLoading(true);
    if (this.shippingService.shipping.id === null) {
      this.shippingService.addShipping(this.shippingService.shipping).subscribe(
        res => {
          this.modalRef.hide();
          this.getShippings();
        }
      );
    } else {
      this.shippingService.editShipping(this.shippingService.shipping).subscribe(
        res => {
          this.modalRef.hide();
          this.getShippings();
        }
      );
    }*/
  }

  public decline(): void {
    this.modalRef.hide();
  }

  public openModalDelete(template: TemplateRef<any>, carrier: ICarrier) {
    this.shippingService.carrier = carrier;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirmDelete(): void {
    this.delete();
    this.modalRef.hide();
  }

  private delete() {
    if (this.shippingService.carrier) {
      this.shippingService.deleteShipping(this.shippingService.carrier)
        .subscribe(res => {
          this.getMyShippings();
        });
    }
  }
}
