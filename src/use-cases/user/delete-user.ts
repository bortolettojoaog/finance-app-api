import { UserNotFoundError } from '../../errors';
import { DeletedUser, User } from '../../types';

interface IDeleteUserRepository {
    execute(userId: string): Promise<User>;
}

interface IGetUserByIdRepository {
    execute(userId: string): Promise<User>;
}

interface ICheckDeletedUserRepository {
    execute(userId: string): Promise<DeletedUser>;
}

export class DeleteUserUseCase {
    private readonly postgresDeleteUserRepository: IDeleteUserRepository;
    private readonly postgresGetUserByIdRepository: IGetUserByIdRepository;
    private readonly postgresCheckDeletedUserRepository: ICheckDeletedUserRepository;

    constructor(
        postgresDeleteUserRepository: IDeleteUserRepository,
        postgresGetUserByIdRepository: IGetUserByIdRepository,
        postgresCheckDeletedUserRepository: ICheckDeletedUserRepository,
    ) {
        this.postgresDeleteUserRepository = postgresDeleteUserRepository;
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresCheckDeletedUserRepository =
            postgresCheckDeletedUserRepository;
    }

    async execute(userId: string): Promise<User> {
        const userExists =
            await this.postgresGetUserByIdRepository.execute(userId);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        const isAlreadyDeleted =
            await this.postgresCheckDeletedUserRepository.execute(userId);

        if (!isAlreadyDeleted.active) {
            throw new UserNotFoundError();
        }

        const deletedUser =
            await this.postgresDeleteUserRepository.execute(userId);

        return deletedUser;
    }
}
