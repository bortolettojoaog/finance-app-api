import { UserNotFoundError } from '../errors/user';
import { PostgresGetUserByMailRepository } from '../repositories/postgres/get-user-by-mail';
import { User } from '../types/user/return-user';

export class GetUserByMailUseCase {
    async execute(email: string): Promise<User> {
        const getUserByMailRepository = new PostgresGetUserByMailRepository();

        const user = await getUserByMailRepository.execute(email);

        if (!user) throw new UserNotFoundError();

        return user;
    }
}
