import {IOrder} from "./interface";

export interface ShippingStatus {
  id: number;
  name: string;
}

export interface Shipping {
  id: number;
  code: string;
  order_id: number;
  order: IOrder;
  package_count: number;
  content: string;
  user_id: number;
  status: number;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}
