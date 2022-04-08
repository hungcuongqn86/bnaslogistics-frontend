import {
  History,
  ICarrier,
  ICarrierPackage,
  ICart,
  ICartItem,
  IChinaWarehouse,
  IInspectionFee,
  IOrder,
  IOrderItem,
  IPackage,
  IRole,
  IServiceFee,
  ISetting,
  IShop,
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
  vip: number;
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
  chinh_ngach: boolean;
  vat: boolean;
  tien_hang: number;
  tra_shop: number;
  vip_id: number;
  ck_dv: number;
  ck_dv_tt: number;
  ck_vc: number;
  deposit: number;
  phi_dat_hang_cs: number;
  phi_dat_hang: number;
  phi_dat_hang_tt: number;
  phi_bao_hiem_cs: number;
  phi_bao_hiem_tt: number;
  phi_kiem_dem_cs: number;
  phi_kiem_dem_tt: number;
  dat_coc: number;
  dat_coc_content: string;
  handle: IUser;
  content_pc: string;
  status: number;
  created_at: string;
  updated_at: string;
  cart: ICart[];
  history: History[];
  user: IUser;
  package: IPackage[];
  order_items: IOrderItem[];

  constructor() {
  }
}

export class Package implements IPackage {
  id: number;
  order_id: number;
  order: IOrder;
  package_code: string;
  contract_code: string;
  ship_khach: number;
  ship_khach_tt: number;
  ship_tt: number;
  ship_tt_tt: number;
  tra_shop: number;
  thanh_toan: number;
  status: number;
  is_main: number;
  note_tl: string;
  weight: number;
  weight_qd: number;
  size: number;
  c_d: number;
  c_r: number;
  c_c: number;
  tien_can: number;
  gia_can: number;
  ck_vc_tt: number;
  tien_can_tt: number;
  cal_option: number;
  phi_van_phat_sinh: number;
  dg_1_price: number;
  dg_2_price: number;
  tien_dong_go: number;
  chong_soc_1_price: number;
  chong_soc_2_price: number;
  tien_chong_soc: number;
  tien_chong_soc_tt: number;
  bill_id: number;
  tien_thanh_ly: number;
  is_deleted: number;
  created_at: string;
  updated_at: string;

  constructor() {
  }
}

export class Carrier implements ICarrier {
  id: number;
  user_id: number;
  product_count: number;
  kiem_hang: boolean;
  dong_go: boolean;
  bao_hiem: boolean;
  chinh_ngach: boolean;
  vat: boolean;
  vip_id: number;
  ck_vc: number;
  phi_kiem_dem_cs: number;
  phi_kiem_dem_tt: number;
  china_warehouses_id: number;
  china_warehouses_address: string;
  status: number;
  statusname: string;
  created_at: string;
  updated_at: string;
  user: IUser;
  carrier_package: ICarrierPackage[];

  constructor() {
    this.carrier_package = [];
  }
}

export class CarrierPackage implements ICarrierPackage {
  id: number;
  carrier_id: number;
  package_code: string;
  product_name: string;
  product_count: number;
  carrier_brand: string;
  description: string;
  note: string;
  is_main: number;
  created_at: string;
  updated_at: string;

  constructor() {
    this.is_main = 0;
  }
}
