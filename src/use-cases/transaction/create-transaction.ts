import { v4 as uuidv4 } from 'uuid';
import { UserNotFoundError } from '../../errors';
import {
    CreateTransactionParams,
    DeletedUser,
    FormCreateTransactionParams,
    Transaction,
    User,
} from '../../types';

interface ICreateTransactionRepository {
    execute(
        formCreateTransactionParams: FormCreateTransactionParams,
    ): Promise<Transaction>;
}

interface IGetUserByIdRepository {
    execute(userId: string): Promise<User>;
}

interface ICheckDeletedUserRepository {
    execute(userId: string): Promise<DeletedUser>;
}

export class CreateTransactionUseCase {
    private readonly postgresCreateTransactionRepository: ICreateTransactionRepository;
    private readonly postgresGetUserByIdRepository: IGetUserByIdRepository;
    private readonly postgresCheckDeletedUserRepository: ICheckDeletedUserRepository;

    constructor(
        postgresCreateTransactionRepository: ICreateTransactionRepository,
        postgresGetUserByIdRepository: IGetUserByIdRepository,
        postgresCheckDeletedUserRepository: ICheckDeletedUserRepository,
    ) {
        this.postgresCreateTransactionRepository =
            postgresCreateTransactionRepository;
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresCheckDeletedUserRepository =
            postgresCheckDeletedUserRepository;
    }

    async execute(
        user_id: string,
        createTransactionParams: FormCreateTransactionParams,
    ): Promise<Transaction> {
        const userExists =
            await this.postgresGetUserByIdRepository.execute(user_id);

        if (!userExists) throw new UserNotFoundError();

        const isDeletedUser =
            await this.postgresCheckDeletedUserRepository.execute(user_id);

        if (!isDeletedUser.active) throw new UserNotFoundError();

        const transactionId = uuidv4();

        const validParams: CreateTransactionParams = {
            ...createTransactionParams,
            user_id,
            id: transactionId,
        };

        const transaction =
            await this.postgresCreateTransactionRepository.execute(validParams);

        return transaction;
    }
}
