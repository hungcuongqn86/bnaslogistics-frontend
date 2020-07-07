import {Cart} from './Cart';

export interface Shop {
    id: number;
    name: string;
    url: string;
    cart: Cart[];
    rate: number;
    count_product: number;
    count_link: number;
    tien_hang: number;
    phi_tam_tinh: number;
    tong: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}
