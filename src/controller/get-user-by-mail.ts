import { Request } from 'express';
import { UserNotFoundError } from '../errors/user';
import { DTOUser } from '../types';
import { GetUserByMailUseCase } from '../use-cases';
import { internalServerError, ok } from './helpers/';
import {
    checkIfEmailIsValid,
    invalidEmailResponse,
    notFoundUserResponse,
} from './helpers/user';

export class GetUserByMailController {
    async execute(request: Request): Promise<DTOUser> {
        try {
            const userMail = request.query.email as string;

            const isValidEmail = checkIfEmailIsValid(userMail);

            if (!isValidEmail) return invalidEmailResponse();

            const getUserByMailUseCase = new GetUserByMailUseCase();

            const user = await getUserByMailUseCase.execute(userMail);

            return ok(user);
        } catch (error) {
            console.error('Error getting user by email:', error);

            if (error instanceof UserNotFoundError)
                return notFoundUserResponse(error.message);

            return internalServerError();
        }
    }
}
