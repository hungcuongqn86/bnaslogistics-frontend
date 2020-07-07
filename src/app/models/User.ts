import {Partner} from './Partner';
import {Transaction} from './Transaction';

export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    partner_id: number;
    partner: Partner;
    transaction: Transaction[];
    name: string;
    email: string;
    password: string;
    c_password: string;
    phone_number: string;
    role_id: number;
    roles: Role[];
    image: string;
    type: number;
    debt: number;
    cost_percent: number;
    rate: number;
    deposit: string;
    weight_price: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}
