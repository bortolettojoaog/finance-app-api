import { Request } from 'express';
import { TransactionNotFoundError } from '../../errors';
import {
    DTOTransaction,
    FormUpdateTransactionParams,
    Transaction,
} from '../../types';
import {
    allFieldAreEmptyResponse,
    checkIfTransactionIdIsValid,
    checkTransactionAmount,
    checkTransactionAmountIsCurrency,
    checkTransactionType,
    internalServerError,
    invalidTransactionAmountResponse,
    invalidTransactionIdResponse,
    invalidTransactionTypeResponse,
    negativeOrNaNTransactionAmountResponse,
    notFoundTransactionResponse,
    ok,
    someFieldNotAllowedResponse,
} from '../helpers';

interface IUpdateTransactionUseCase {
    execute(
        TransactionId: string,
        updateTransactionParams: Partial<FormUpdateTransactionParams>,
    ): Promise<Transaction>;
}

export class UpdateTransactionController {
    private readonly updateTransactionUseCase: IUpdateTransactionUseCase;

    constructor(updateTransactionUseCase: IUpdateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase;
    }

    async execute(httpRequest: Request): Promise<DTOTransaction> {
        try {
            const transactionId = httpRequest.params.transactionId as string;

            const isValidUUID = checkIfTransactionIdIsValid(transactionId);

            if (!isValidUUID) return invalidTransactionIdResponse();

            const allFieldsAreEmpty =
                Object.keys(httpRequest.body).length === 0;

            if (allFieldsAreEmpty) return allFieldAreEmptyResponse();

            const params = httpRequest.body as FormUpdateTransactionParams;

            const allowedFields = ['name', 'amount', 'date', 'type'];

            const isSomeFieldNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            );

            if (isSomeFieldNotAllowed) return someFieldNotAllowedResponse();

            if (params.type) {
                const isTransactionTypeValid = checkTransactionType(
                    params.type,
                );

                if (!isTransactionTypeValid)
                    return invalidTransactionTypeResponse();
            }

            if (params.amount) {
                const isAmountValid = checkTransactionAmount(params.amount);

                if (!isAmountValid)
                    return negativeOrNaNTransactionAmountResponse();

                const isAmountCurrency = checkTransactionAmountIsCurrency(
                    params.amount,
                );

                if (!isAmountCurrency)
                    return invalidTransactionAmountResponse();
            }

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    transactionId,
                    params,
                );

            return ok(updatedTransaction);
        } catch (error) {
            console.error('Error updating transaction:', error);

            if (error instanceof TransactionNotFoundError)
                return notFoundTransactionResponse();

            return internalServerError();
        }
    }
}
