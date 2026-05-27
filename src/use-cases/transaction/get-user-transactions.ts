import { UserNotFoundError } from '../../errors';
import { Transaction, User } from '../../types';

interface IGetUserTransactionsRepository {
    execute(userId: string): Promise<Transaction[]>;
}

interface IGetUserByIdRepository {
    execute(userId: string): Promise<User>;
}

export class GetUserTransactionsUseCase {
    private readonly postgresGetUserTransactionsRepository: IGetUserTransactionsRepository;
    private readonly postgresGetUserByIdRepository: IGetUserByIdRepository;

    constructor(
        postgresGetUserTransactionsRepository: IGetUserTransactionsRepository,
        postgresGetUserByIdRepository: IGetUserByIdRepository,
    ) {
        this.postgresGetUserTransactionsRepository =
            postgresGetUserTransactionsRepository;
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
    }

    async execute(userId: string): Promise<Transaction[]> {
        const userExists =
            await this.postgresGetUserByIdRepository.execute(userId);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        const transactions =
            await this.postgresGetUserTransactionsRepository.execute(userId);

        return transactions;
    }
}
