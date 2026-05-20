import { Request } from 'express';
import validator from 'validator';
import { UserNotFoundError } from '../errors/user';
import { DTOUser } from '../types/user/dto-user';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id';
import { badRequest, internalServerError, ok } from './helpers';

export class GetUserByIdController {
    async execute(request: Request): Promise<DTOUser> {
        try {
            const userId = request.params.userId as string;

            if (!userId) return badRequest('User ID is required');

            const isValidUUID = validator.isUUID(userId);
            if (!isValidUUID) return badRequest('Invalid user ID format');

            const getUserByIdUseCase = new GetUserByIdUseCase();

            const user = await getUserByIdUseCase.execute(userId);

            if (!user) return badRequest('User not found');

            return ok(user);
        } catch (error) {
            console.error('Error getting user by id:', error);

            if (error instanceof UserNotFoundError)
                return badRequest(error.message);

            return internalServerError();
        }
    }
}
