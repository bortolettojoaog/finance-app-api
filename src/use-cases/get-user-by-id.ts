import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id';
import { User } from '../types/user/return-user';

export class GetUserByIdUseCase {
    async execute(userId: string): Promise<User> {
        const getUserByIdRepository = new PostgresGetUserByIdRepository();

        const user = await getUserByIdRepository.execute(userId);

        return user;
    }
}
