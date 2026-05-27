import { UserNotFoundError } from '../errors';
import {
    PostgresDeleteUserRepository,
    PostgresGetUserByIdRepository,
} from '../repositories/postgres';
import { User } from '../types';

export class DeleteUserUseCase {
    async execute(userId: string): Promise<User> {
        const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
        const postgresGetUserByIdRepository =
            new PostgresGetUserByIdRepository();

        const userExists = await postgresGetUserByIdRepository.execute(userId);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        const isAlreadyDeleted =
            await postgresDeleteUserRepository.execute(userId);

        if (isAlreadyDeleted) {
            throw new UserNotFoundError();
        }

        const deletedUser = await postgresDeleteUserRepository.execute(userId);

        return deletedUser;
    }
}
