import { UserNotFoundError } from '../../errors';
import { User, UserBalance } from '../../types';

interface IGetUserBalanceRepository {
    execute(userId: string): Promise<UserBalance>;
}

interface IGetUserByIdRepository {
    execute(userId: string): Promise<User>;
}

export class GetUserBalanceUseCase {
    private readonly postgresGetUserBalanceRepository: IGetUserBalanceRepository;
    private readonly postgresGetUserByIdRepository: IGetUserByIdRepository;

    constructor(
        postgresGetUserBalanceRepository: IGetUserBalanceRepository,
        postgresGetUserByIdRepository: IGetUserByIdRepository,
    ) {
        this.postgresGetUserBalanceRepository =
            postgresGetUserBalanceRepository;
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
    }

    async execute(userId: string): Promise<UserBalance> {
        const userExists =
            await this.postgresGetUserByIdRepository.execute(userId);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        const userBalance =
            await this.postgresGetUserBalanceRepository.execute(userId);

        return userBalance;
    }
}
