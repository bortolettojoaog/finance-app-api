import { PostgresCheckDeletedUserRepository } from '../repositories/postgres';

export class CheckDeletedUserUseCase {
    async execute(userId: string): Promise<boolean> {
        const postgresCheckDeletedUserRepository =
            new PostgresCheckDeletedUserRepository();

        const isDeleted =
            await postgresCheckDeletedUserRepository.execute(userId);

        return isDeleted;
    }
}
