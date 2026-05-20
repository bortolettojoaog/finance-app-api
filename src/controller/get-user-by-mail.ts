import { Request } from 'express';
import validator from 'validator';
import { UserNotFoundError } from '../errors/user';
import { DTOUser } from '../types/user/dto-user';
import { GetUserByMailUseCase } from '../use-cases/get-user-by-mail';
import { badRequest, internalServerError, notFound, ok } from './helpers';

export class GetUserByMailController {
    async execute(request: Request): Promise<DTOUser> {
        try {
            const email = request.query.email as string;

            const isValidEmail = validator.isEmail(email);

            if (!isValidEmail) return badRequest('Invalid email format');

            const getUserByMailUseCase = new GetUserByMailUseCase();

            const user = await getUserByMailUseCase.execute(email);

            return ok(user);
        } catch (error) {
            console.error('Error getting user by email:', error);

            if (error instanceof UserNotFoundError)
                return notFound(error.message);

            return internalServerError();
        }
    }
}
