import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShippingService} from '../../services/shipping/shipping.service';
import {ICarrier, ICarrierPackage, IChinaWarehouse, IPackage} from "../../models/interface";
import {Carrier, CarrierPackage} from "../../models/model";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {forkJoin, Observable} from "rxjs";
import {SettingService} from "../../services/setting/setting.service";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-myshipping-detail',
  templateUrl: './myshipping.detail.component.html',
  styleUrls: ['./myshipping.detail.component.css']
})

export class MyshippingDetailComponent implements OnInit {
  public carrier: ICarrier;
  public carrierPackage: ICarrierPackage;
  public col = '';
  public errorMessage: string[] = [];

  private modalRef: BsModalRef;
  public chinaWarehouses: IChinaWarehouse[];

  constructor(private router: Router, private route: ActivatedRoute, public settingService: SettingService, private auth: AuthService
    , public shippingService: ShippingService, private modalService: BsModalService) {
    this.carrierPackage = new CarrierPackage();
    this.carrier = new Carrier();
    this.carrier.carrier_package.push(new CarrierPackage());
    this.route.params.subscribe(params => {
      /*if (params['id']) {
        this.orderService.orderRe.id = params['id'];
        this.getOrder();
      }*/
    });
  }

  ngOnInit() {
    this.getChinaWarehouses();
  }

  private getOrder() {
    /*if (this.orderService.orderRe.id !== null) {
      this.orderService.getOrder(this.orderService.orderRe.id)
        .subscribe(order => {
          this.orderService.orderRe = order.data;
        });
    }*/
  }

  public addPackage() {

  }

  public selectPackage(item: ICarrierPackage, col: string) {
    this.col = col;
    this.carrierPackage = item;
  }

  public hideInput() {
    this.col = "";
    this.carrierPackage = new CarrierPackage();
  }

  public deletePackage(template: TemplateRef<any>, item: IPackage) {

  }

  public carrierSave() {
    console.log(this.carrier);
  }

  private getChinaWarehouses() {
    this.settingService.showLoading(true);
    const getChinaWarehousesObs: Observable<any> = this.settingService.getChinaWarehouses();

    const listSub = forkJoin([
      getChinaWarehousesObs
    ]).subscribe(([chinaWarehouses]) => {
      this.chinaWarehouses = chinaWarehouses.data.data;
      this.setWarehouseInfo();
      this.settingService.showLoading(false);
      listSub.unsubscribe();
    });
  }

  private setWarehouseInfo() {
    const code = this.auth.user.code;
    this.chinaWarehouses.forEach(item => {
      item.address = item.address.replace('#code#', code);
      item.receiver = item.receiver.replace('#code#', code);
    });
  }

  public backlist() {
    this.router.navigate(['/shipping/myshipping']);
  }

  public openErrorModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  public declineError(): void {
    this.modalRef.hide();
  }
}
