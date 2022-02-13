import {Component, TemplateRef} from '@angular/core';
import {SettingService} from '../../services/setting/setting.service';
import {IInspectionFee, IServiceFee, ISetting, ITransportFee, IVip, IWarehouse} from '../../models/interface';
import {Router} from '@angular/router';
import {forkJoin, Subject, Observable, Subscription} from 'rxjs';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ServiceFee} from "../../models/model";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})

export class SettingComponent {
  settings: ISetting[];
  vips: IVip[];
  serviceFees: IServiceFee[];
  warehouses: IWarehouse[];
  inspectionFees: IInspectionFee[];
  transportFees: ITransportFee[];

  serviceFee: IServiceFee;

  modalRef: BsModalRef;

  serviceFeeErrorMessage: string[] = [];

  constructor(public settingService: SettingService, private router: Router, private modalService: BsModalService,) {
    this.getAllListData();
  }

  private getAllListData() {
    this.settingService.showLoading(true);
    const getWarehousesObs: Observable<any> = this.settingService.getWarehouses();
    const getTransportFeesObs: Observable<any> = this.settingService.getTransportFees();
    const getInspectionFeesObs: Observable<any> = this.settingService.getInspectionFees();
    const getSettingsObs: Observable<any> = this.settingService.getSettings();
    const getVipsObs: Observable<any> = this.settingService.getVips();
    const getServiceFeesObs: Observable<any> = this.settingService.getServiceFees();

    const listSub = forkJoin([
      getWarehousesObs,
      getTransportFeesObs,
      getInspectionFeesObs,
      getSettingsObs,
      getVipsObs,
      getServiceFeesObs
    ]).subscribe(([warehouses, transportFees, inspectionFees, settings, vips, serviceFees]) => {
      this.warehouses = warehouses.data.data;
      this.inspectionFees = inspectionFees.data.data;
      this.transportFees = transportFees.data.data;
      this.settings = settings.data.data;
      this.vips = vips.data.data;
      this.serviceFees = serviceFees.data.data;
      this.settingService.showLoading(false);
      listSub.unsubscribe();
    });
  }

  private getTransportFeesData() {
    this.settingService.showLoading(true);
    const getTransportFeesObs: Observable<any> = this.settingService.getTransportFees();

    const listSub = forkJoin([
      getTransportFeesObs
    ]).subscribe(([transportFees]) => {
      this.transportFees = transportFees.data.data;
      this.settingService.showLoading(false);
      listSub.unsubscribe();
    });
  }

  public serviceFeeModalOpen(template: TemplateRef<any>, item: IServiceFee = null) {
    if(item){
      this.serviceFee = item;
    }else{
      this.serviceFee = new ServiceFee();
    }
    this.modalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});
  }

  public serviceFeeConfirm(): void {
    this.modalRef.hide();
  }

  public declineModal(): void {
    this.modalRef.hide();
  }

  public editSetting(id) {
    this.router.navigate([`/setting/edit/${id}`]);
  }
}
