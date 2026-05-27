import { Request } from 'express';
import { TransactionNotFoundError } from '../../errors';
import { DTOTransaction, Transaction } from '../../types';
import {
    checkIfTransactionIdIsValid,
    internalServerError,
    invalidTransactionIdResponse,
    notFoundTransationResponse,
    ok,
    requiredIdResponse,
} from '../helpers';

interface IGetTransationByIdUseCase {
    execute(TransationId: string): Promise<Transaction>;
}

export class GetTransationByIdController {
    private readonly getTransationByIdUseCase: IGetTransationByIdUseCase;

    constructor(getTransationByIdUseCase: IGetTransationByIdUseCase) {
        this.getTransationByIdUseCase = getTransationByIdUseCase;
    }

    async execute(httpRequest: Request): Promise<DTOTransaction> {
        try {
            const transationId = httpRequest.params.transationId as string;

            if (!transationId) return requiredIdResponse();

            const isValidUUID = checkIfTransactionIdIsValid(transationId);

            if (!isValidUUID) return invalidTransactionIdResponse();

            const transation =
                await this.getTransationByIdUseCase.execute(transationId);

            return ok(transation);
        } catch (error) {
            console.error('Error getting Transation by id:', error);

            if (error instanceof TransactionNotFoundError)
                return notFoundTransationResponse();

            return internalServerError();
        }
    }
}
