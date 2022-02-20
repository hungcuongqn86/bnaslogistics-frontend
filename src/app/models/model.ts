import {
  ICart, ICartItem,
  IChinaWarehouse,
  IInspectionFee,
  IRole,
  IServiceFee,
  ISetting, IShop,
  ITransportFee,
  IUser,
  IVip
} from "./interface";
import {Partner} from "./Partner";
import {Transaction} from "./Transaction";


export class Setting implements ISetting {
  id: number;
  key: string;
  value: string;
  title: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;

  constructor() {

  }
}

export class Cart implements ICart {
  id: number;
  shop: IShop[];
  cart_items: ICartItem[];
  kiem_hang: boolean;
  dong_go: boolean;
  bao_hiem: boolean;
  count_product: number;
  tien_hang: number;
  vip_id: number;
  ck_dv: number;
  ck_dv_tt: number;
  phi_dat_hang_cs: number;
  phi_dat_hang: number;
  phi_dat_hang_tt: number;
  phi_bao_hiem_cs: number;
  phi_bao_hiem_tt: number;
  ti_gia: number;
  status: number;
  created_at: string;
  updated_at: string;

  constructor() {

  }
}

export class TransportFee implements ITransportFee {
  id: number;
  type: number;
  warehouse_id: number;
  title: string;
  note: string;
  min_r: number;
  max_r: number;
  val: number;
  created_at: string;
  updated_at: string;

  constructor() {

  }
}

export class InspectionFee implements IInspectionFee {
  id: number;
  title: string;
  note: string;
  min_count: number;
  max_count: number;
  val: number;
  created_at: string;
  updated_at: string;

  constructor() {

  }
}

export class ServiceFee implements IServiceFee {
  id: number;
  title: string;
  note: string;
  min_tot_tran: number;
  max_tot_tran: number;
  val: number;
  created_at: string;
  updated_at: string;

  constructor() {

  }
}

export class Vip implements IVip {
  id: number;
  title: string;
  note: string;
  min_tot_tran: number;
  max_tot_tran: number;
  ck_dv: number;
  ck_vc: number;
  deposit: number;
  created_at: string;
  updated_at: string;

  constructor() {

  }
}

export class ChinaWarehouse implements IChinaWarehouse {
  id: number;
  name: string;
  note: string;
  address: string;
  receiver: string;
  phone: string;
  zipcode: string;
  status: number;
  created_at: string;
  updated_at: string;

  constructor() {
    this.status = 1;
  }
}

export class User implements IUser {
  id: number;
  code: string;
  partner_id: number;
  partner: Partner;
  transaction: Transaction[];
  name: string;
  email: string;
  password: string;
  c_password: string;
  phone_number: string;
  address: string;
  active: string;
  role_id: number;
  roles: IRole[];
  image: string;
  type: number;
  debt: number;
  cost_percent: number;
  rate: number;
  deposit: string;
  hander: number;
  handle: any;
  vip: string;
  bank_number: string;
  bank_name: string;
  bank_username: string;
  bank_branch: string;
  weight_price: number;
  is_deleted: number;
  created_at: string;
  updated_at: string;

  constructor() {
    this.is_deleted = 0;
  }
}
