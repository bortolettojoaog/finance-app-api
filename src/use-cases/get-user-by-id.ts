import { PostgresGetUserByIdRepository } from '../repositories/postgres';
import { User } from '../types';

export class GetUserByIdUseCase {
    async execute(userId: string): Promise<User> {
        const getUserByIdRepository = new PostgresGetUserByIdRepository();

        const user = await getUserByIdRepository.execute(userId);

        return user;
    }
}
