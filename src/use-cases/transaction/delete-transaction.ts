import { TransactionNotFoundError } from '../../errors';
import { DeletedTransaction, Transaction } from '../../types';

interface IDeleteTransactionRepository {
    execute(TransactionId: string): Promise<Transaction>;
}

interface IGetTransactionByIdRepository {
    execute(TransactionId: string): Promise<Transaction>;
}

interface ICheckDeletedTransactionRepository {
    execute(TransactionId: string): Promise<DeletedTransaction>;
}

export class DeleteTransactionUseCase {
    private readonly postgresDeleteTransactionRepository: IDeleteTransactionRepository;
    private readonly postgresGetTransactionByIdRepository: IGetTransactionByIdRepository;
    private readonly postgresCheckDeletedTransactionRepository: ICheckDeletedTransactionRepository;

    constructor(
        postgresDeleteTransactionRepository: IDeleteTransactionRepository,
        postgresGetTransactionByIdRepository: IGetTransactionByIdRepository,
        postgresCheckDeletedTransactionRepository: ICheckDeletedTransactionRepository,
    ) {
        this.postgresDeleteTransactionRepository =
            postgresDeleteTransactionRepository;
        this.postgresGetTransactionByIdRepository =
            postgresGetTransactionByIdRepository;
        this.postgresCheckDeletedTransactionRepository =
            postgresCheckDeletedTransactionRepository;
    }

    async execute(transactionId: string): Promise<Transaction> {
        const transactionExists =
            await this.postgresGetTransactionByIdRepository.execute(
                transactionId,
            );

        if (!transactionExists) {
            throw new TransactionNotFoundError();
        }

        const isAlreadyDeleted =
            await this.postgresCheckDeletedTransactionRepository.execute(
                transactionId,
            );

        if (!isAlreadyDeleted.active) {
            throw new TransactionNotFoundError();
        }

        const deletedTransaction =
            await this.postgresDeleteTransactionRepository.execute(
                transactionId,
            );

        return deletedTransaction;
    }
}
