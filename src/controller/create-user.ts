import { Request } from 'express';
import { EmailAlreadyInUseError } from '../errors';
import { DTOUser, FormCreateUserParams, User } from '../types';
import { badRequest, created, internalServerError } from './helpers';
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailAlreadyInUseResponse,
    invalidEmailResponse,
    invalidPasswordResponse,
} from './helpers/user';

interface ICreateUserUseCase {
    execute(formCreateUserParams: FormCreateUserParams): Promise<User>;
}

export class CreateUserController {
    private readonly createUserUseCase: ICreateUserUseCase;

    constructor(createUserUseCase: ICreateUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

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

            const createdUser = await this.createUserUseCase.execute(params);

            return created(createdUser);
        } catch (error) {
            console.error('Error creating user:', error);

            if (error instanceof EmailAlreadyInUseError)
                return emailAlreadyInUseResponse(error.message);

            return internalServerError();
        }
    }
}
