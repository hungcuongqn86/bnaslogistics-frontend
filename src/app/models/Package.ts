import {IOrder} from "./interface";

export interface Package {
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
    tien_can: number;
    gia_can: number;
    tien_thanh_ly: number;
    phi_van_phat_sinh: number;
    bill_id: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface PackageStatus {
    id: number;
    name: string;
}
