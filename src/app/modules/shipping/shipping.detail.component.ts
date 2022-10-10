import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShippingService} from '../../services/shipping/shipping.service';
import {ICarrier, ICarrierPackage, IChinaWarehouse} from '../../models/interface';
import {Carrier, CarrierPackage} from '../../models/model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {forkJoin, Observable} from 'rxjs';
import {SettingService} from '../../services/setting/setting.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-shipping-detail',
  templateUrl: './shipping.detail.component.html',
  styleUrls: ['./shipping.detail.component.css']
})

export class ShippingDetailComponent implements OnInit {
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
    const newPk = new CarrierPackage();
    newPk.is_main = 1;
    this.carrier.carrier_package.push(newPk);
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.shippingService.carrier.id = params['id'];
        this.getCarrier();
      }
    });
  }

  ngOnInit() {
    this.getChinaWarehouses();
  }

  private getCarrier() {
    if (this.shippingService.carrier.id !== null) {
      this.shippingService.getShipping(this.shippingService.carrier.id)
        .subscribe(carrier => {
          this.carrier = carrier.data;
        });
    }
  }

  public addPackage() {
    this.carrier.carrier_package.push(new CarrierPackage());
  }

  public selectPackage(item: ICarrierPackage, col: string) {
    this.col = col;
    this.carrierPackage = item;
  }

  public hideInput() {
    this.col = '';
    this.carrierPackage = new CarrierPackage();
  }

  public setAddress(address: string) {
    this.carrier.china_warehouses_address = address;
  }

  public deletePackage(template: TemplateRef<any>, item: ICarrierPackage) {
    const index = this.carrier.carrier_package.indexOf(item);
    if (index > -1) {
      this.carrier.carrier_package.splice(index, 1);
    }
  }

  public carrierSave(template: TemplateRef<any>) {
    // this.shippingService.showLoading(true);
    /*this.shippingService.updateShipping(this.carrier).subscribe(
      res => {
        if (res.status) {

        } else {
          this.errorMessage = res.data;
          this.openErrorModal(template);
        }
        this.getCarrier();
        this.shippingService.showLoading(false);
      }
    );*/
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
      if (item.id === 2) {
        this.carrier.china_warehouses_id = item.id;
        this.carrier.china_warehouses_address = item.address;
      }
    });
  }

  public backlist() {
    this.router.navigate(['/shipping/list']);
  }

  public openErrorModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  public declineError(): void {
    this.modalRef.hide();
  }
}