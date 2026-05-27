import { Request } from 'express';
import { EmailAlreadyInUseError } from '../errors';
import { DTOUser, FormCreateUserParams } from '../types';
import { CreateUserUseCase } from '../use-cases';
import { badRequest, created, internalServerError } from './helpers';
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailAlreadyInUseResponse,
    invalidEmailResponse,
    invalidPasswordResponse,
} from './helpers/user';

export class CreateUserController {
    async execute(httpRequest: Request): Promise<DTOUser> {
        try {
            const params: FormCreateUserParams = httpRequest.body;

            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];
            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest(
                        `Field '${field}' is required and cannot be empty.`,
                    );
                }
            }

            const isPasswordValid = checkIfPasswordIsValid(params.password);

            if (!isPasswordValid) return invalidPasswordResponse();

            const isEmailValid = checkIfEmailIsValid(params.email);

            if (!isEmailValid) return invalidEmailResponse();

            const createUserUseCase = new CreateUserUseCase();

            const createdUser = await createUserUseCase.execute(params);

            return created(createdUser);
        } catch (error) {
            console.error('Error creating user:', error);

            if (error instanceof EmailAlreadyInUseError)
                return emailAlreadyInUseResponse(error.message);

            return internalServerError();
        }
    }
}
