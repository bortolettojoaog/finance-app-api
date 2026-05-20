import { PostgresGetUserByMailRepository } from '../repositories/postgres/get-user-by-mail';

export class GetUserByMailUseCase {
    async execute(email: string) {
        const getUserByMailRepository = new PostgresGetUserByMailRepository();

        const user = await getUserByMailRepository.execute(email);

        return user;
    }
}
