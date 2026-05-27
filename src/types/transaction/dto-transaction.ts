import { Transaction } from './return-transaction';

export interface DTOTransaction {
    status_code: number;
    body: null | Transaction;
    error: null | string;
}
