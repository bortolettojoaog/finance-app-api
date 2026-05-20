import { Request } from 'express';
import validator from 'validator';
import { EmailAlreadyInUseError } from '../errors/user';
import { DTOUser } from '../types/user/dto-user';
import { FormCreateUserParams } from '../types/user/form-create-user';
import { CreateUserUseCase } from '../use-cases/create-user';
import { badRequest, created, internalServerError } from './helpers/http';
import {
    emailAlreadyInUseResponse,
    invalidEmailResponse,
    invalidPasswordResponse,
} from './helpers/user';

export class CreateUserController {
    async execute(httpRequest: Request): Promise<DTOUser> {
        try {
            const formCreateUserParams: FormCreateUserParams = httpRequest.body;

            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];
            for (const field of requiredFields) {
                if (
                    !formCreateUserParams[field] ||
                    formCreateUserParams[field].trim().length === 0
                ) {
                    return badRequest(
                        `Field '${field}' is required and cannot be empty.`,
                    );
                }
            }

            const isPasswordValid = formCreateUserParams.password.length >= 6;

            if (!isPasswordValid) return invalidPasswordResponse();

            const isEmailValid = validator.isEmail(formCreateUserParams.email);

            if (!isEmailValid) return invalidEmailResponse();

            const createUserUseCase = new CreateUserUseCase();

            const createdUser =
                await createUserUseCase.execute(formCreateUserParams);

            return created(createdUser);
        } catch (error) {
            console.error('Error creating user:', error);

            if (error instanceof EmailAlreadyInUseError)
                return emailAlreadyInUseResponse(error.message);

            return internalServerError();
        }
    }
}
