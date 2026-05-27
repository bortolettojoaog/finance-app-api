import { TransactionType } from './';

export interface CreateTransactionParams {
    id: string;
    user_id: string;
    name: string;
    date: Date;
    amount: number;
    type: TransactionType;
}
