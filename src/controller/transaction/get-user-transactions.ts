import { Request } from 'express';
import { TransactionNotFoundError, UserNotFoundError } from '../../errors';
import { DTOTransaction, Transaction } from '../../types';
import {
    checkIfIdIsValid,
    internalServerError,
    invalidTransactionIdResponse,
    notFoundTransactionResponse,
    notFoundUserResponse,
    ok,
    requiredIdResponse,
} from '../helpers';

interface IGetUserTransactionsUseCase {
    execute(TransactionId: string): Promise<Transaction[]>;
}

export class GetUserTransactionsController {
    private readonly getUserTransactionsUseCase: IGetUserTransactionsUseCase;

    constructor(getUserTransactionsUseCase: IGetUserTransactionsUseCase) {
        this.getUserTransactionsUseCase = getUserTransactionsUseCase;
    }

    async execute(httpRequest: Request): Promise<DTOTransaction> {
        try {
            const userId = httpRequest.params.userId as string;

            if (!userId) return requiredIdResponse();

            const isValidUUID = checkIfIdIsValid(userId);

            if (!isValidUUID) return invalidTransactionIdResponse();

            const transactions =
                await this.getUserTransactionsUseCase.execute(userId);

            return ok(transactions);
        } catch (error) {
            console.error('Error getting transactions by user:', error);

            if (error instanceof TransactionNotFoundError)
                return notFoundTransactionResponse();

            if (error instanceof UserNotFoundError)
                return notFoundUserResponse(error.message);

            return internalServerError();
        }
    }
}
