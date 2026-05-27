import { DeletedUser } from '../types';

interface ICheckDeletedUserUseCase {
    execute(userId: string): Promise<DeletedUser>;
}

export class CheckDeletedUserUseCase {
    readonly postgresCheckDeletedUserRepository: ICheckDeletedUserUseCase;

    constructor(postgresCheckDeletedUserRepository: ICheckDeletedUserUseCase) {
        this.postgresCheckDeletedUserRepository =
            postgresCheckDeletedUserRepository;
    }

    async execute(userId: string): Promise<DeletedUser> {
        const isDeleted =
            await this.postgresCheckDeletedUserRepository.execute(userId);

        return isDeleted;
    }
}
