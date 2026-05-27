import { TransactionNotFoundError } from '../../errors';
import { FormCreateTransactionParams, Transaction } from '../../types';

interface IUpdateTransactionRepository {
    execute(
        transactionId: string,
        updateTransactionParams: Partial<FormCreateTransactionParams>,
    ): Promise<Transaction>;
}

interface IGetTransactionById {
    execute(transactionId: string): Promise<Transaction>;
}

export class UpdateTransactionUseCase {
    private readonly postgresUpdateTransactionRepository: IUpdateTransactionRepository;
    private readonly postgresGetTransactionById: IGetTransactionById;

    constructor(
        postgresUpdateTransactionRepository: IUpdateTransactionRepository,
        postgresGetTransactionById: IGetTransactionById,
    ) {
        this.postgresUpdateTransactionRepository =
            postgresUpdateTransactionRepository;
        this.postgresGetTransactionById = postgresGetTransactionById;
    }

    async execute(
        transactionId: string,
        updateTransactionParams: Partial<FormCreateTransactionParams>,
    ): Promise<Transaction> {
        const transactionExists =
            await this.postgresGetTransactionById.execute(transactionId);

        if (!transactionExists) throw new TransactionNotFoundError();

        const updatedTransaction =
            await this.postgresUpdateTransactionRepository.execute(
                transactionId,
                updateTransactionParams,
            );

        return updatedTransaction;
    }
}
