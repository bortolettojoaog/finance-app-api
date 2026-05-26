import { Request } from 'express';
import { UserNotFoundError } from '../errors';
import { DTOUser } from '../types';
import { DeleteUserUseCase } from '../use-cases';
import {
    checkIfUserIdIsValid,
    internalServerError,
    invalidUserIdResponse,
    notFound,
    ok,
} from './helpers';

export class DeleteUserController {
    async execute(request: Request): Promise<DTOUser> {
        try {
            const userId = request.params.userId as string;

            const isValidUUID = checkIfUserIdIsValid(userId);

            if (!isValidUUID) return invalidUserIdResponse();

            const deleteUserUseCase = new DeleteUserUseCase();

            const deletedUser = await deleteUserUseCase.execute(userId);

            return ok(deletedUser);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return notFound(error.message);
            }

            return internalServerError();
        }
    }
}
