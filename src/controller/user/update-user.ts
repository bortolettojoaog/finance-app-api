import { Request } from 'express';
import { EmailAlreadyInUseError } from '../../errors';
import { DTOUser, FormUpdateUserParams, User } from '../../types';
import { internalServerError, ok } from '../helpers';
import {
    allFieldAreEmptyResponse,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    checkIfUserIdIsValid,
    emailAlreadyInUseResponse,
    invalidEmailResponse,
    invalidPasswordResponse,
    invalidUserIdResponse,
    someFieldNotAllowedResponse,
} from '../helpers/user';

interface IUpdateUserController {
    execute(
        userId: string,
        updateUserParams: Partial<FormUpdateUserParams>,
    ): Promise<User>;
}

export class UpdateUserController {
    private readonly updateUserUseCase: IUpdateUserController;

    constructor(updateUserUseCase: IUpdateUserController) {
        this.updateUserUseCase = updateUserUseCase;
    }

    async execute(request: Request): Promise<DTOUser> {
        try {
            const userId = request.params.userId as string;

            const isValidUUID = checkIfUserIdIsValid(userId);

            if (!isValidUUID) return invalidUserIdResponse();

            const allFieldsAreEmpty = Object.keys(request.body).length === 0;

            if (allFieldsAreEmpty) return allFieldAreEmptyResponse();

            const params = request.body as FormUpdateUserParams;

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const isSomeFieldNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            );

            if (isSomeFieldNotAllowed) return someFieldNotAllowedResponse();

            if (params.password) {
                const isPasswordValid = checkIfPasswordIsValid(params.password);

                if (!isPasswordValid) return invalidPasswordResponse();
            }

            if (params.email) {
                const isEmailValid = checkIfEmailIsValid(params.email);

                if (!isEmailValid) return invalidEmailResponse();
            }

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            );

            return ok(updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);

            if (error instanceof EmailAlreadyInUseError)
                return emailAlreadyInUseResponse(error.message);

            return internalServerError();
        }
    }
}
