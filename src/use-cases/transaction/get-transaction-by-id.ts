import { Transaction } from '../../types';

interface IGetTransactionByIdRepository {
    execute(transactionId: string): Promise<Transaction>;
}

export class GetTransactionByIdUseCase {
    private readonly postgresGetTransactionByIdRepository: IGetTransactionByIdRepository;

    constructor(getTransactionByIdRepository: IGetTransactionByIdRepository) {
        this.postgresGetTransactionByIdRepository =
            getTransactionByIdRepository;
    }

    async execute(transactionId: string): Promise<Transaction> {
        const transaction =
            await this.postgresGetTransactionByIdRepository.execute(
                transactionId,
            );

        return transaction;
    }
}
