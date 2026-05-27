import { DeletedTransaction, DeletedUser } from '../../types';

interface ICheckDeletedTransactionRepository {
    execute(transactionId: string): Promise<DeletedTransaction>;
}

export class CheckDeletedTransactionUseCase {
    readonly postgresCheckDeletedTransactionRepository: ICheckDeletedTransactionRepository;

    constructor(
        postgresCheckDeletedTransactionRepository: ICheckDeletedTransactionRepository,
    ) {
        this.postgresCheckDeletedTransactionRepository =
            postgresCheckDeletedTransactionRepository;
    }

    async execute(transactionId: string): Promise<DeletedUser> {
        const isDeleted =
            await this.postgresCheckDeletedTransactionRepository.execute(
                transactionId,
            );

        return isDeleted;
    }
}
