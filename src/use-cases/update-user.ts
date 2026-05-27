import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../errors';
import { PostgresGetUserByMailRepository } from '../repositories/postgres/get-user-by-mail';
import { FormCreateUserParams, User } from '../types';

interface IUpdateUserRepository {
    execute(
        userId: string,
        updateUserParams: Partial<FormCreateUserParams>,
    ): Promise<User>;
}

export class UpdateUserUseCase {
    private readonly postgresUpdateUserRepository: IUpdateUserRepository;

    constructor(postgresUpdateUserRepository: IUpdateUserRepository) {
        this.postgresUpdateUserRepository = postgresUpdateUserRepository;
    }

    async execute(
        userId: string,
        updateUserParams: Partial<FormCreateUserParams>,
    ): Promise<User> {
        if (updateUserParams.email) {
            const postgresGetUserByMailRepository =
                new PostgresGetUserByMailRepository();

            const userAlreadyExists =
                await postgresGetUserByMailRepository.execute(
                    updateUserParams.email,
                );

            if (userAlreadyExists && userAlreadyExists.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email);
            }
        }

        const userTobeUpdated = {
            ...updateUserParams,
        };

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            );

            userTobeUpdated.password = hashedPassword;
        }

        const updatedUser = await this.postgresUpdateUserRepository.execute(
            userId,
            userTobeUpdated,
        );

        return updatedUser;
    }
}
