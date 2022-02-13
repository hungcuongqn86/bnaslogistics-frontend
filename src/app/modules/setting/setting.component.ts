import {Component, TemplateRef} from '@angular/core';
import {SettingService} from '../../services/setting/setting.service';
import {IInspectionFee, IServiceFee, ISetting, ITransportFee, IVip, IWarehouse} from '../../models/interface';
import {Router} from '@angular/router';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {InspectionFee, ServiceFee} from "../../models/model";

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
  inspectionFee: IInspectionFee;

  modalRef: BsModalRef;

  serviceFeeSub: Subscription;
  inspectionFeeSub: Subscription;

  serviceFeeErrorMessage: string[] = [];
  inspectionFeeErrorMessage: string[] = [];

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

  public getTransportFeesData() {
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

  // =====================================================================================
  // ServiceFees

  private getServiceFees() {
    this.settingService.showLoading(true);
    const getServiceFeesObs: Observable<any> = this.settingService.getServiceFees();

    const listSub = forkJoin([
      getServiceFeesObs
    ]).subscribe(([serviceFees]) => {
      this.serviceFees = serviceFees.data.data;
      this.settingService.showLoading(false);
      listSub.unsubscribe();
    });
  }

  public serviceFeeModalOpen(template: TemplateRef<any>, item: IServiceFee = null) {
    if (item) {
      this.serviceFee = item;
    } else {
      this.serviceFee = new ServiceFee();
    }
    this.modalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});
  }

  public serviceFeeConfirm(): void {
    let updateObs: Observable<any> = new Observable<any>();
    if (this.serviceFee.id) {
      // Update
      updateObs = this.settingService.editServiceFees(this.serviceFee);
    } else {
      // Create
      updateObs = this.settingService.addServiceFees(this.serviceFee);
    }
    this.settingService.showLoading(true);
    this.serviceFeeSub = updateObs.subscribe(data => {
      if (data.status) {
        this.serviceFeeErrorMessage = [];
        this.getServiceFees();
        this.modalRef.hide();
      } else {
        for (let i = 0; i < data.data.length; i++) {
          this.serviceFeeErrorMessage.push(data.data[i]);
        }
      }
      this.settingService.showLoading(false);
      this.serviceFeeSub.unsubscribe();
    });
  }

  public serviceFeeDelModalOpen(template: TemplateRef<any>, item: IServiceFee) {
    this.serviceFee = item;
    this.modalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});
  }

  public serviceFeeDelConfirm(): void {
    const deleteObs: Observable<any> = this.settingService.deleteServiceFees(this.serviceFee);
    this.settingService.showLoading(true);
    this.serviceFeeSub = deleteObs.subscribe(data => {
      if (data.status) {
        this.serviceFeeErrorMessage = [];
        this.getServiceFees();
        this.modalRef.hide();
      } else {
        for (let i = 0; i < data.data.length; i++) {
          this.serviceFeeErrorMessage.push(data.data[i]);
        }
      }
      this.settingService.showLoading(false);
      this.serviceFeeSub.unsubscribe();
    });
  }

  // =====================================================================================
  // InspectionFees

  private getInspectionFees() {
    this.settingService.showLoading(true);
    const getInspectionFeesObs: Observable<any> = this.settingService.getInspectionFees();

    const listSub = forkJoin([
      getInspectionFeesObs
    ]).subscribe(([inspectionFees]) => {
      this.inspectionFees = inspectionFees.data.data;
      this.settingService.showLoading(false);
      listSub.unsubscribe();
    });
  }

  public inspectionFeeModalOpen(template: TemplateRef<any>, item: IInspectionFee = null) {
    if (item) {
      this.inspectionFee = item;
    } else {
      this.inspectionFee = new InspectionFee();
    }
    this.modalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});
  }

  public inspectionFeeConfirm(): void {
    let updateObs: Observable<any> = new Observable<any>();
    if (this.inspectionFee.id) {
      // Update
      updateObs = this.settingService.editInspectionFee(this.inspectionFee);
    } else {
      // Create
      updateObs = this.settingService.addInspectionFee(this.inspectionFee);
    }
    this.settingService.showLoading(true);
    this.inspectionFeeSub = updateObs.subscribe(data => {
      if (data.status) {
        this.inspectionFeeErrorMessage = [];
        this.getInspectionFees();
        this.modalRef.hide();
      } else {
        for (let i = 0; i < data.data.length; i++) {
          this.inspectionFeeErrorMessage.push(data.data[i]);
        }
      }
      this.settingService.showLoading(false);
      this.inspectionFeeSub.unsubscribe();
    });
  }

  public inspectionFeeDelModalOpen(template: TemplateRef<any>, item: IInspectionFee) {
    this.inspectionFee = item;
    this.modalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});
  }

  public inspectionFeeDelConfirm(): void {
    const deleteObs: Observable<any> = this.settingService.deleteInspectionFee(this.inspectionFee);
    this.settingService.showLoading(true);
    this.inspectionFeeSub = deleteObs.subscribe(data => {
      if (data.status) {
        this.inspectionFeeErrorMessage = [];
        this.getInspectionFees();
        this.modalRef.hide();
      } else {
        for (let i = 0; i < data.data.length; i++) {
          this.inspectionFeeErrorMessage.push(data.data[i]);
        }
      }
      this.settingService.showLoading(false);
      this.inspectionFeeSub.unsubscribe();
    });
  }

  // =========================================================================================

  public declineModal(): void {
    this.modalRef.hide();
  }

  public editSetting(id) {
    this.router.navigate([`/setting/edit/${id}`]);
  }
}
