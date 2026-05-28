import { Request } from 'express';
import { UserNotFoundError } from '../../errors/user';
import { DTOUserBalance, UserBalance } from '../../types';
import { checkIfIdIsValid, internalServerError, ok } from '../helpers';
import {
    invalidUserIdResponse,
    notFoundUserResponse,
    requiredIdResponse,
} from '../helpers/user';

interface IGetUserBalanceUseCase {
    execute(userId: string): Promise<UserBalance>;
}

export class GetUserBalanceController {
    private readonly getUserBalanceUseCase: IGetUserBalanceUseCase;

    constructor(getUserBalanceUseCase: IGetUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase;
    }

    async execute(httpRequest: Request): Promise<DTOUserBalance> {
        try {
            const userId = httpRequest.params.userId as string;

            if (!userId) return requiredIdResponse();

            const isValidUUID = checkIfIdIsValid(userId);

            if (!isValidUUID) return invalidUserIdResponse();

            const userBalance =
                await this.getUserBalanceUseCase.execute(userId);

            return ok(userBalance);
        } catch (error) {
            console.error('Error getting user balance:', error);

            if (error instanceof UserNotFoundError)
                return notFoundUserResponse(error.message);

            return internalServerError();
        }
    }
}
