import { UserNotFoundError } from '../../errors';
import { DeletedUser, User } from '../../types';

interface IDeleteUserUseCase {
    execute(userId: string): Promise<User>;
}

interface IGetUserByIdRepository {
    execute(userId: string): Promise<User>;
}

interface ICheckDeletedUserRepository {
    execute(userId: string): Promise<DeletedUser>;
}

export class DeleteUserUseCase {
    private readonly postgresDeleteUserRepository: IDeleteUserUseCase;
    private readonly postgresGetUserByIdRepository: IGetUserByIdRepository;
    private readonly checkDeletedUserRepository: ICheckDeletedUserRepository;

    constructor(
        postgresDeleteUserRepository: IDeleteUserUseCase,
        postgresGetUserByIdRepository: IGetUserByIdRepository,
        checkDeletedUserRepository: ICheckDeletedUserRepository,
    ) {
        this.postgresDeleteUserRepository = postgresDeleteUserRepository;
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.checkDeletedUserRepository = checkDeletedUserRepository;
    }

    async execute(userId: string): Promise<User> {
        const userExists =
            await this.postgresGetUserByIdRepository.execute(userId);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        const isAlreadyDeleted =
            await this.checkDeletedUserRepository.execute(userId);

        if (!isAlreadyDeleted.active) {
            throw new UserNotFoundError();
        }

        const deletedUser =
            await this.postgresDeleteUserRepository.execute(userId);

        return deletedUser;
    }
}
