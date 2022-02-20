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

export interface ICart {
  id: number;
  name: string;
  url: string;
  items: ICartItem[];
  rate: number;
  count_product: number;
  count_link: number;
  kiem_hang: boolean;
  dong_go: boolean;
  bao_hiem: boolean;
  tien_hang: number;
  phi_tam_tinh: number;
  ship_khach: number;
  vip: string;
  vip_dc: number;
  tong: number;
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
  vip: string;
  bank_number: string;
  bank_name: string;
  bank_username: string;
  bank_branch: string;
  weight_price: number;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}
