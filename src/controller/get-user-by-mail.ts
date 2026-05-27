import { Request } from 'express';
import { UserNotFoundError } from '../errors/user';
import { DTOUser, User } from '../types';
import { internalServerError, ok } from './helpers/';
import {
    checkIfEmailIsValid,
    invalidEmailResponse,
    notFoundUserResponse,
} from './helpers/user';

interface IGetUserByMailController {
    execute(email: string): Promise<User>;
}

export class GetUserByMailController {
    private readonly getUserByMailUseCase: IGetUserByMailController;

    constructor(getUserByMailUseCase: IGetUserByMailController) {
        this.getUserByMailUseCase = getUserByMailUseCase;
    }

    async execute(request: Request): Promise<DTOUser> {
        try {
            const userMail = request.query.email as string;

            const isValidEmail = checkIfEmailIsValid(userMail);

            if (!isValidEmail) return invalidEmailResponse();

            const user = await this.getUserByMailUseCase.execute(userMail);

            return ok(user);
        } catch (error) {
            console.error('Error getting user by email:', error);

            if (error instanceof UserNotFoundError)
                return notFoundUserResponse(error.message);

            return internalServerError();
        }
    }
}
