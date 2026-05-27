import { Request } from 'express';
import { UserNotFoundError } from '../../errors';
import {
    DTOTransaction,
    FormCreateTransactionParams,
    Transaction,
} from '../../types';
import {
    badRequest,
    checkIfUserIdIsValid,
    internalServerError,
    invalidUserIdResponse,
    notFoundUserResponse,
    ok,
    requiredIdResponse,
} from '../helpers';
import {
    checkTransactionAmount,
    checkTransactionType,
    invalidTransactionAmountResponse,
    invalidTransactionTypeResponse,
} from '../helpers/transaction';

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

            const isValidUUID = checkIfUserIdIsValid(userId);

            if (!isValidUUID) return invalidUserIdResponse();

            const params: FormCreateTransactionParams = httpRequest.body;

            const requiredFields = ['name', 'date', 'amount', 'type'];

            for (const field of requiredFields) {
                if (
                    params[field] == null ||
                    (typeof params[field] === 'string' &&
                        params[field].trim().length === 0)
                ) {
                    return badRequest(
                        `Field '${field}' is required and cannot be empty.`,
                    );
                }
            }

            const isValidAmount = checkTransactionAmount(params.amount);

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
