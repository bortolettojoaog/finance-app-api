import { TransactionType } from './';

export interface FormCreateTransactionParams {
    name: string;
    date: Date;
    amount: number;
    type: TransactionType;
    [key: string]: any;
}
