import validator from 'validator';
import { TransactionType } from '../../types';
import { badRequest } from './http';

export const invalidTransactionTypeResponse = () => {
    return badRequest(
        'Invalid transaction type. Type must be either earning, investment or expense.',
    );
};

export const invalidTransactionAmountResponse = () => {
    return badRequest(
        'Invalid transaction amount. Amount must be a currency value',
    );
};

export const negativeOrNaNTransactionAmountResponse = () => {
    return badRequest(
        'Invalid transaction amount. Amount must be a positive number.',
    );
};

export const invalidTransactionIdResponse = () => {
    return badRequest('Invalid transaction ID format');
};

export const notFoundTransactionResponse = () => {
    return badRequest('Transaction not found.');
};

export const checkTransactionType = (type: string) => {
    return Object.values(TransactionType).includes(type as TransactionType);
};

export const checkTransactionAmount = (amount: number) => {
    return !isNaN(amount) && amount > 0;
};

export const checkTransactionAmountIsCurrency = (amount: number) => {
    return validator.isCurrency(amount.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    });
};

export const checkIfTransactionIdIsValid = (userId: string): boolean => {
    return validator.isUUID(userId);
};
