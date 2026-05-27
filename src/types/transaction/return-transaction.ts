import { TransactionType } from './transactional-types';

export interface Transaction {
    id: string;
    user_id: string;
    name: string;
    date: Date;
    amount: number;
    type: TransactionType;
}
