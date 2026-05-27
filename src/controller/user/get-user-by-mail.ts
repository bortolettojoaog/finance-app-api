import { Request } from 'express';
import { UserNotFoundError } from '../../errors/user';
import { DTOUser, User } from '../../types';
import { internalServerError, ok } from '../helpers';
import {
    checkIfEmailIsValid,
    invalidEmailResponse,
    notFoundUserResponse,
} from '../helpers/user';

interface IGetUserByMailUseCase {
    execute(email: string): Promise<User | null>;
}

export class GetUserByMailController {
    private readonly getUserByMailUseCase: IGetUserByMailUseCase;

    constructor(getUserByMailUseCase: IGetUserByMailUseCase) {
        this.getUserByMailUseCase = getUserByMailUseCase;
    }

    async execute(httpRequest: Request): Promise<DTOUser> {
        try {
            const userMail = httpRequest.query.email as string;

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
