import { DeletedUser } from '../../types';

interface ICheckDeletedRepository {
    execute(userId: string): Promise<DeletedUser>;
}

export class CheckDeletedUserUseCase {
    readonly postgresCheckDeletedUserRepository: ICheckDeletedRepository;

    constructor(postgresCheckDeletedUserRepository: ICheckDeletedRepository) {
        this.postgresCheckDeletedUserRepository =
            postgresCheckDeletedUserRepository;
    }

    async execute(userId: string): Promise<DeletedUser> {
        const isDeleted =
            await this.postgresCheckDeletedUserRepository.execute(userId);

        return isDeleted;
    }
}
