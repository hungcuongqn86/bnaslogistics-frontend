import {Partner} from "./Partner";
import {Transaction} from "./Transaction";

export interface ISetting {
  id: number;
  key: string;
  value: string;
  title: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

export interface IShop {
  id: number;
  name: string;
  url: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

export interface ICart {
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
}

export interface ICartItem {
  id: number;
  user_id: number;
  shop_id: number;
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
  status: number;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

export interface IWarehouse {
  id: number;
  title: string;
  note: string;
  address: string;
  phone: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface IServiceFee {
  id: number;
  title: string;
  note: string;
  min_tot_tran: number;
  max_tot_tran: number;
  val: number;
  created_at: string;
  updated_at: string;
}

export interface IInspectionFee {
  id: number;
  title: string;
  note: string;
  min_count: number;
  max_count: number;
  val: number;
  created_at: string;
  updated_at: string;
}

export interface ITransportFee {
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
}

export interface IVip {
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
}

export interface IChinaWarehouse {
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
}

export interface IRole {
  id: number;
  name: string;
  position: string;
}

export interface IUser {
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
}

export interface IOrderItem {
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
}

export interface IOrder {
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
  package: IPackage[];
  order_items: IOrderItem[];
}

export interface History {
  id: number;
  user_id: number;
  user_name: string;
  order_id: number;
  type: number;
  content: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

export interface HistoryType {
  id: number;
  name: string;
  sys: number;
}

export interface OrderStatus {
  id: number;
  name: string;
}

export interface PackageStatus {
  id: number;
  name: string;
}

export interface IPackage {
  id: number;
  order_id: number;
  order: IOrder;
  package_code: string;
  contract_code: string;
  ship_khach: number;
  ship_tt: number;
  tra_shop: number;
  thanh_toan: number;
  status: number;
  note_tl: string;
  weight: number;
  weight_qd: number;
  size: number;
  gia_can: number;
  tien_can: number;
  ck_vc_tt: number;
  tien_can_tt: number;
  cal_option: number;
  phi_van_phat_sinh: number;
  bill_id: number;
  created_at: string;
  updated_at: string;
}
