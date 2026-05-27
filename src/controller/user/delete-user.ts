import { Request } from 'express';
import { UserNotFoundError } from '../../errors';
import { DTOUser, User } from '../../types';
import {
    checkIfUserIdIsValid,
    internalServerError,
    invalidUserIdResponse,
    notFound,
    ok,
} from '../helpers';

interface IDeleteUserController {
    execute(userId: string): Promise<User>;
}

export class DeleteUserController {
    private readonly deleteUserUseCase: IDeleteUserController;

    constructor(deleteUserUseCase: IDeleteUserController) {
        this.deleteUserUseCase = deleteUserUseCase;
    }

    async execute(httpRequest: Request): Promise<DTOUser> {
        try {
            const userId = httpRequest.params.userId as string;

            const isValidUUID = checkIfUserIdIsValid(userId);

            if (!isValidUUID) return invalidUserIdResponse();

            const deletedUser = await this.deleteUserUseCase.execute(userId);

            return ok(deletedUser);
        } catch (error) {
            console.log('Error deleting user:', error);

            if (error instanceof UserNotFoundError) {
                return notFound(error.message);
            }

            return internalServerError();
        }
    }
}
