import { Request } from 'express';
import { TransactionNotFoundError } from '../../errors';
import { DTOTransaction, Transaction } from '../../types';
import {
    checkIfIdIsValid,
    internalServerError,
    invalidTransactionIdResponse,
    notFound,
    ok,
} from '../helpers';

interface IDeleteTransactionUseCase {
    execute(TransactionId: string): Promise<Transaction>;
}

export class DeleteTransactionController {
    private readonly deleteTransactionUseCase: IDeleteTransactionUseCase;

    constructor(deleteTransactionUseCase: IDeleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase;
    }

    async execute(httpRequest: Request): Promise<DTOTransaction> {
        try {
            const transactionId = httpRequest.params.transactionId as string;

            const isValidUUID = checkIfIdIsValid(transactionId);

            if (!isValidUUID) return invalidTransactionIdResponse();

            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(transactionId);

            return ok(deletedTransaction);
        } catch (error) {
            console.log('Error deleting transaction:', error);

            if (error instanceof TransactionNotFoundError) {
                return notFound(error.message);
            }

            return internalServerError();
        }
    }
}
