import {IOrder, IPackage, IUser} from './interface';

export interface WarehouseWait {
    id: number;
    code: string;
    name: string;
    email: string;
    phone_number: string;
    debt: number;
    cost_percent: number;
    package: IPackage[];
    show_tc: boolean;
    tien_xuat_kho: number;
    tien_thieu_xuat_kho: number;
    rate: number;
    order: IOrder[];
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface Warehouse {
    id: number;
}

export interface Bill {
    id: number;
    code: string;
    user_id: number;
    user: IUser;
    bill_date: string;
    created_at: string;
    tien_can: number;
    tien_thanh_ly: number;
    tien_dong_go: number;
    tien_chong_soc: number;
    phi_van_phat_sinh: number;
    status: number;
    employee_id: number;
    employee: IUser;
    package: IPackage[];
    so_ma: number;
}

export interface BillStatus {
    id: number;
    name: string;
}
