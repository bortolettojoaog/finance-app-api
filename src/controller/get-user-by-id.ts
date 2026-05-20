import { Request } from 'express';
import { UserNotFoundError } from '../errors/user';
import { DTOUser } from '../types';
import { GetUserByIdUseCase } from '../use-cases';
import { internalServerError, ok } from './helpers';
import {
    checkIfUserIdIsValid,
    invalidUserIdResponse,
    notFoundUserResponse,
    requiredIdResponse,
} from './helpers/user';

export class GetUserByIdController {
    async execute(request: Request): Promise<DTOUser> {
        try {
            const userId = request.params.userId as string;

            if (!userId) return requiredIdResponse();

            const isValidUUID = checkIfUserIdIsValid(userId);

            if (!isValidUUID) return invalidUserIdResponse();

            const getUserByIdUseCase = new GetUserByIdUseCase();

            const user = await getUserByIdUseCase.execute(userId);

            return ok(user);
        } catch (error) {
            console.error('Error getting user by id:', error);

            if (error instanceof UserNotFoundError)
                return notFoundUserResponse(error.message);

            return internalServerError();
        }
    }
}
