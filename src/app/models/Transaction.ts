import {User} from './User';

export interface TransactionType {
    id: number;
    name: string;
    value: number;
}

export interface Transaction {
    id: number;
    user_id: number;
    user: User;
    type: number;
    otype: TransactionType;
    debt: number;
    bank_account: number;
    bank_debt: number;
    code: string;
    value: number;
    content: string;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface WithdrawalRequest {
  id: number;
  user_id: number;
  user: User;
  value: number;
  content: string;
  status: number;
  feedback: string;
  bank_account: number;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

export interface WithdrawalRequestStatus {
  id: number;
  name: string;
}
