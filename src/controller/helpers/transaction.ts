import { TransactionType } from '../../types';
import { badRequest } from './http';

export const invalidTransactionTypeResponse = () => {
    return badRequest(
        'Invalid transaction type. Type must be either earning, investment or expense.',
    );
};

export const invalidTransactionAmountResponse = () => {
    return badRequest(
        'Invalid transaction amount. Amount must be a positive number.',
    );
};

export const checkTransactionType = (type: string) => {
    return Object.values(TransactionType).includes(type as TransactionType);
};

export const checkTransactionAmount = (amount: number) => {
    return (
        !isNaN(amount) &&
        amount > 0 &&
        Math.round(amount * 100) === amount * 100
    );
};
