import { DeletedUser, DTODeletedUser } from '../../types/user';
import {
    checkIfUserIdIsValid,
    internalServerError,
    invalidUserIdResponse,
    ok,
} from '../helpers';

import { Request } from 'express';

interface ICheckDeletedUserController {
    execute(userId: string): Promise<DeletedUser>;
}

export class CheckDeletedUserController {
    private readonly checkDeletedUserUseCase: ICheckDeletedUserController;

    constructor(checkDeletedUserUseCase: ICheckDeletedUserController) {
        this.checkDeletedUserUseCase = checkDeletedUserUseCase;
    }

    async execute(httpRequest: Request): Promise<DTODeletedUser> {
        try {
            const userId = httpRequest.params.userId as string;

            const isValidUUID = checkIfUserIdIsValid(userId);

            if (!isValidUUID) return invalidUserIdResponse();

            const isDeleted =
                await this.checkDeletedUserUseCase.execute(userId);

            return ok(isDeleted);
        } catch (error) {
            console.error('Error creating user:', error);

            return internalServerError();
        }
    }
}
