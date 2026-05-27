import { UserNotFoundError } from '../errors';
import {
    PostgresDeleteUserRepository,
    PostgresGetUserByIdRepository,
} from '../repositories/postgres';
import { User } from '../types';

interface IDeleteUserUseCase {
    execute(userId: string): Promise<User>;
}

export class DeleteUserUseCase {
    private readonly postgresDeleteUserRepository: PostgresDeleteUserRepository;

    constructor(postgresDeleteUserRepository: IDeleteUserUseCase) {
        this.postgresDeleteUserRepository = postgresDeleteUserRepository;
    }

    async execute(userId: string): Promise<User> {
        const postgresGetUserByIdRepository =
            new PostgresGetUserByIdRepository();

        const userExists = await postgresGetUserByIdRepository.execute(userId);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        const isAlreadyDeleted =
            await this.postgresDeleteUserRepository.execute(userId);

        if (isAlreadyDeleted) {
            throw new UserNotFoundError();
        }

        const deletedUser =
            await this.postgresDeleteUserRepository.execute(userId);

        return deletedUser;
    }
}
