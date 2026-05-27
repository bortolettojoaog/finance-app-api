import { v4 as uuidv4 } from 'uuid';
import { UserNotFoundError } from '../../errors';
import {
    CreateTransactionParams,
    DeletedUser,
    FormCreateTransactionParams,
    Transaction,
} from '../../types';

interface ICreateTransactionRepository {
    execute(
        formCreateTransactionParams: FormCreateTransactionParams,
    ): Promise<Transaction>;
}

interface ICheckDeletedUserRepository {
    execute(userId: string): Promise<DeletedUser>;
}

export class CreateTransactionUseCase {
    private readonly createTransactionRepository: ICreateTransactionRepository;
    private readonly checkDeletedUserRepository: ICheckDeletedUserRepository;

    constructor(
        createTransactionRepository: ICreateTransactionRepository,
        checkDeletedUserRepository: ICheckDeletedUserRepository,
    ) {
        this.createTransactionRepository = createTransactionRepository;
        this.checkDeletedUserRepository = checkDeletedUserRepository;
    }

    async execute(
        user_id: string,
        createTransactionParams: FormCreateTransactionParams,
    ): Promise<Transaction> {
        const isDeletedUser =
            await this.checkDeletedUserRepository.execute(user_id);

        if (!isDeletedUser.active) throw new UserNotFoundError();

        const transactionId = uuidv4();

        const validParams: CreateTransactionParams = {
            ...createTransactionParams,
            user_id,
            id: transactionId,
        };

        const transaction =
            await this.createTransactionRepository.execute(validParams);

        return transaction;
    }
}
