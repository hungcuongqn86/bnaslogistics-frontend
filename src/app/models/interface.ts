export interface ISetting {
  id: number;
  key: string;
  value: string;
  title: string;
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
