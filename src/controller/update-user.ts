import { Request } from 'express';
import validator from 'validator';
import { EmailAlreadyInUseError } from '../errors/user';
import { DTOUser } from '../types/user/dto-user';
import { FormUpdateUserParams } from '../types/user/form-update-user';
import { UpdateUserUseCase } from '../use-cases/update-user';
import { badRequest, internalServerError, ok } from './helpers';

export class UpdateUserController {
    async execute(request: Request): Promise<DTOUser> {
        try {
            const userId = request.params.userId as string;

            const isValidUUID = validator.isUUID(userId);

            if (!isValidUUID) return badRequest('Invalid user ID format');

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

            if (isSomeFieldNotAllowed)
                return badRequest(
                    'Some provided fields are not allowed for update',
                );

            if (updateUserParams.password) {
                const isPasswordValid = updateUserParams.password.length >= 6;

                if (!isPasswordValid) {
                    return badRequest(
                        'Password must be at least 6 characters long',
                    );
                }
            }

            if (updateUserParams.email) {
                const isEmailValid = validator.isEmail(updateUserParams.email);

                if (!isEmailValid) {
                    return badRequest(
                        'Invalid email format. Please provide a valid email address.',
                    );
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();

            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            );

            return ok(updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest(error.message);
            }

            return internalServerError();
        }
    }
}
