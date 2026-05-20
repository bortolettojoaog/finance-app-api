import { Request } from 'express';
import validator from 'validator';
import { EmailAlreadyInUseError } from '../errors/user';
import { DTOUser } from '../types/user/dto-user';
import { FormUpdateUserParams } from '../types/user/form-update-user';
import { UpdateUserUseCase } from '../use-cases/update-user';
import { internalServerError, ok } from './helpers/http';
import {
    allFieldAreEmptyResponse,
    emailAlreadyInUseResponse,
    invalidEmailResponse,
    invalidPasswordResponse,
    invalidUserIdResponse,
    someFieldNotAllowedResponse,
} from './helpers/user';

export class UpdateUserController {
    async execute(request: Request): Promise<DTOUser> {
        try {
            const userId = request.params.userId as string;

            const isValidUUID = validator.isUUID(userId);

            if (!isValidUUID) return invalidUserIdResponse();

            const allFieldsAreEmpty = Object.keys(request.body).length === 0;

            if (allFieldsAreEmpty) return allFieldAreEmptyResponse();

            const updateUserParams = request.body as FormUpdateUserParams;

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const isSomeFieldNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            );

            if (isSomeFieldNotAllowed) return someFieldNotAllowedResponse();

            if (updateUserParams.password) {
                const isPasswordValid = updateUserParams.password.length >= 6;

                if (!isPasswordValid) return invalidPasswordResponse();
            }

            if (updateUserParams.email) {
                const isEmailValid = validator.isEmail(updateUserParams.email);

                if (!isEmailValid) return invalidEmailResponse();
            }

            const updateUserUseCase = new UpdateUserUseCase();

            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
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
