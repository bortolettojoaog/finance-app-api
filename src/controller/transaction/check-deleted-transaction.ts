import { DeletedTransaction, DTODeletedTransaction } from '../../types';
import {
    checkIfIdIsValid,
    internalServerError,
    invalidTransactionIdResponse,
    ok,
} from '../helpers';

import { Request } from 'express';

interface ICheckDeletedTransactionUseCase {
    execute(transactionId: string): Promise<DeletedTransaction>;
}

export class CheckDeletedTransactionController {
    private readonly checkDeletedTransactionUseCase: ICheckDeletedTransactionUseCase;

    constructor(
        checkDeletedTransactionUseCase: ICheckDeletedTransactionUseCase,
    ) {
        this.checkDeletedTransactionUseCase = checkDeletedTransactionUseCase;
    }

    async execute(httpRequest: Request): Promise<DTODeletedTransaction> {
        try {
            const transactionId = httpRequest.params.transactionId as string;

            const isValidUUID = checkIfIdIsValid(transactionId);

            if (!isValidUUID) return invalidTransactionIdResponse();

            const isDeleted =
                await this.checkDeletedTransactionUseCase.execute(
                    transactionId,
                );

            return ok(isDeleted);
        } catch (error) {
            console.error('Error creating transaction:', error);

            return internalServerError();
        }
    }
}
