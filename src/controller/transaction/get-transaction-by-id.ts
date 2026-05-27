import { Request } from 'express';
import { TransactionNotFoundError } from '../../errors';
import { DTOTransaction, Transaction } from '../../types';
import {
    checkIfTransactionIdIsValid,
    internalServerError,
    invalidTransactionIdResponse,
    notFoundTransactionResponse,
    ok,
    requiredIdResponse,
} from '../helpers';

interface IGetTransactionByIdUseCase {
    execute(TransactionId: string): Promise<Transaction>;
}

export class GetTransactionByIdController {
    private readonly getTransactionByIdUseCase: IGetTransactionByIdUseCase;

    constructor(getTransactionByIdUseCase: IGetTransactionByIdUseCase) {
        this.getTransactionByIdUseCase = getTransactionByIdUseCase;
    }

    async execute(httpRequest: Request): Promise<DTOTransaction> {
        try {
            const transactionId = httpRequest.params.transactionId as string;

            if (!transactionId) return requiredIdResponse();

            const isValidUUID = checkIfTransactionIdIsValid(transactionId);

            if (!isValidUUID) return invalidTransactionIdResponse();

            const transaction =
                await this.getTransactionByIdUseCase.execute(transactionId);

            return ok(transaction);
        } catch (error) {
            console.error('Error getting transaction by id:', error);

            if (error instanceof TransactionNotFoundError)
                return notFoundTransactionResponse();

            return internalServerError();
        }
    }
}
