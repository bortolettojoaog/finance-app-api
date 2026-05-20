import { Request } from 'express';
import validator from 'validator';
import { UserNotFoundError } from '../errors/user';
import { DTOUser } from '../types/user/dto-user';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id';
import { internalServerError, ok } from './helpers/http';
import {
    invalidUserIdResponse,
    notFoundUserResponse,
    requiredIdResponse,
} from './helpers/user';

export class GetUserByIdController {
    async execute(request: Request): Promise<DTOUser> {
        try {
            const userId = request.params.userId as string;

            if (!userId) return requiredIdResponse();

            const isValidUUID = validator.isUUID(userId);

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
