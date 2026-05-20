import { Request } from 'express';
import { DTOUser } from '../types/user/dto-user';
import { FormCreateUserParams } from '../types/user/form-create-user';
import { CreateUserUseCase } from '../use-cases/create-user';

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
                    return {
                        status_code: 400,
                        error: `Missing required field: ${field}`,
                        body: null,
                    };
                }
            }

            // check required fields (obrigatory fields and password length)

            // call use case to create user
            const createUserUseCase = new CreateUserUseCase();

            // return answer to client (status code and created user)
            const createdUser =
                await createUserUseCase.execute(formCreateUserParams);

            return {
                status_code: 201,
                body: createdUser,
                error: null,
            };
        } catch (error) {
            console.error('Error creating user:', error);
            return {
                status_code: 500,
                body: null,
                error: 'Internal server error',
            };
        }
    }
}
