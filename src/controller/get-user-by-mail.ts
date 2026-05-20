import { Request } from 'express';
import { UserNotFoundError } from '../errors/user';
import { DTOUser } from '../types/user/dto-user';
import { GetUserByMailUseCase } from '../use-cases/get-user-by-mail';
import { internalServerError, ok } from './helpers/http';
import {
    checkIfEmailIsValid,
    invalidEmailResponse,
    notFoundUserResponse,
} from './helpers/user';

export class GetUserByMailController {
    async execute(request: Request): Promise<DTOUser> {
        try {
            const email = request.query.email as string;

            const isValidEmail = checkIfEmailIsValid(email);

            if (!isValidEmail) return invalidEmailResponse();

            const getUserByMailUseCase = new GetUserByMailUseCase();

            const user = await getUserByMailUseCase.execute(email);

            return ok(user);
        } catch (error) {
            console.error('Error getting user by email:', error);

            if (error instanceof UserNotFoundError)
                return notFoundUserResponse(error.message);

            return internalServerError();
        }
    }
}
