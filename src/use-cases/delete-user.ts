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

        const userAlreadyExists =
            await postgresGetUserByIdRepository.execute(userId);

        if (!userAlreadyExists) {
            throw new UserNotFoundError();
        }

        const deletedUser = await postgresDeleteUserRepository.execute(userId);

        return deletedUser;
    }
}
