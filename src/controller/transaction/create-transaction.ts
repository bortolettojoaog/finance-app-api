import { Request } from 'express';
import { UserNotFoundError } from '../../errors';
import {
    DTOTransaction,
    FormCreateTransactionParams,
    Transaction,
} from '../../types';
import {
    checkIfIdIsValid,
    checkTransactionAmount,
    checkTransactionAmountIsCurrency,
    checkTransactionType,
    internalServerError,
    invalidTransactionAmountResponse,
    invalidTransactionTypeResponse,
    invalidUserIdResponse,
    missingField,
    negativeOrNaNTransactionAmountResponse,
    notFoundUserResponse,
    ok,
    requiredIdResponse,
    validateRequiredFields,
} from '../helpers';

interface ICreateTransactionUseCase {
    execute(
        user_id: string,
        params: FormCreateTransactionParams,
    ): Promise<Transaction>;
}

export class CreateTransactionController {
    private readonly createTransactionUseCase: ICreateTransactionUseCase;

    constructor(createTransactionUseCase: ICreateTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    async execute(httpRequest: Request): Promise<DTOTransaction> {
        try {
            const userId = httpRequest.params.userId as string;

            if (!userId) return requiredIdResponse();

            const isValidUUID = checkIfIdIsValid(userId);

            if (!isValidUUID) return invalidUserIdResponse();

            const params: FormCreateTransactionParams = httpRequest.body;

            const requiredFields = ['name', 'date', 'amount', 'type'];

            const requiredFieldValidation = validateRequiredFields(
                params,
                requiredFields,
            );

            if (!requiredFieldValidation.requiredFieldsWereProvided)
                return missingField(requiredFieldValidation.missingField);

            const isPositiveAmount = checkTransactionAmount(params.amount);

            if (!isPositiveAmount)
                return negativeOrNaNTransactionAmountResponse();

            const isValidAmount = checkTransactionAmountIsCurrency(
                params.amount,
            );

            if (!isValidAmount) return invalidTransactionAmountResponse();

            const isValidType = checkTransactionType(params.type);

            if (!isValidType) return invalidTransactionTypeResponse();

            const createdTransaction =
                await this.createTransactionUseCase.execute(userId, params);

            return ok(createdTransaction);
        } catch (error) {
            console.error('Error creating transaction:', error);

            if (error instanceof UserNotFoundError)
                return notFoundUserResponse(error.message);

            return internalServerError();
        }
    }
}
