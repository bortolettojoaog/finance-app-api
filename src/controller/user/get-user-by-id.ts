import { Request } from 'express';
import { UserNotFoundError } from '../../errors/user';
import { DTOUser, User } from '../../types';
import { internalServerError, ok } from '../helpers';
import {
    checkIfUserIdIsValid,
    invalidUserIdResponse,
    notFoundUserResponse,
    requiredIdResponse,
} from '../helpers/user';

interface IGetUserByIdUseCase {
    execute(userId: string): Promise<User>;
}

export class GetUserByIdController {
    private readonly getUserByIdUseCase: IGetUserByIdUseCase;

    constructor(getUserByIdUseCase: IGetUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
    }

    async execute(httpRequest: Request): Promise<DTOUser> {
        try {
            const userId = httpRequest.params.userId as string;

            if (!userId) return requiredIdResponse();

            const isValidUUID = checkIfUserIdIsValid(userId);

            if (!isValidUUID) return invalidUserIdResponse();

            const user = await this.getUserByIdUseCase.execute(userId);

            return ok(user);
        } catch (error) {
            console.error('Error getting user by id:', error);

            if (error instanceof UserNotFoundError)
                return notFoundUserResponse(error.message);

            return internalServerError();
        }
    }
}
