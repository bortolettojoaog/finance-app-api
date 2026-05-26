import { UserNotFoundError } from '../errors';
import {
    PostgresDeleteUserRepository,
    PostgresGetUserByIdRepository,
} from '../repositories/postgres';
import { DTOUser } from '../types';

export class DeleteUserUseCase {
    async execute(userId: string): Promise<DTOUser> {
        const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
        const postgresGetUserByIdRepository =
            new PostgresGetUserByIdRepository();

        const userExists = await postgresGetUserByIdRepository.execute(userId);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        const deletedUser = await postgresDeleteUserRepository.execute(userId);

        return deletedUser;
    }
}
