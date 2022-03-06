import {
  ICart,
  ICartItem,
  IChinaWarehouse,
  IInspectionFee,
  IOrder,
  IOrderItem,
  IRole,
  IServiceFee,
  ISetting,
  IShop,
  ITransportFee,
  IUser,
  IVip,
  History
} from "./interface";
import {Partner} from "./Partner";
import {Transaction} from "./Transaction";
import {Package} from "./Package";


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
  chinh_ngach: boolean;
  vat: boolean;
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
  phi_kiem_dem_cs: number;
  phi_kiem_dem_tt: number;
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

export class OrderItem implements IOrderItem {
  id: number;
  user_id: number;
  order_id: number;
  amount: number;
  begin_amount: number;
  color: string;
  colortxt: string;
  count: number;
  domain: string;
  image: string;
  method: string;
  name: string;
  note: string;
  nv_note: string;
  kho_note: string;
  price: string;
  price_arr: string;
  pro_link: string;
  pro_properties: string;
  rate: string;
  site: string;
  size: string;
  sizetxt: string;
  created_at: string;
  updated_at: string;

  constructor() {
  }
}

export class Order implements IOrder {
  id: number;
  user_id: number;
  code: string;
  cart_id: number;
  shipping: number;
  ti_gia: number;
  count_product: number;
  kiem_hang: boolean;
  dong_go: boolean;
  bao_hiem: boolean;
  tien_hang: number;
  vip_id: number;
  ck_dv: number;
  ck_dv_tt: number;
  phi_dat_hang_cs: number;
  phi_dat_hang: number;
  phi_dat_hang_tt: number;
  phi_bao_hiem_cs: number;
  phi_bao_hiem_tt: number;
  phi_kiem_dem_cs: number;
  phi_kiem_dem_tt: number;
  tong: number;
  dat_coc: number;
  con_thieu: number;
  dat_coc_content: string;
  handle: IUser;
  content_pc: string;
  status: number;
  created_at: string;
  updated_at: string;
  cart: ICart[];
  history: History[];
  user: IUser;
  package: Package[];
  order_items: IOrderItem[];

  constructor() {
  }
}
