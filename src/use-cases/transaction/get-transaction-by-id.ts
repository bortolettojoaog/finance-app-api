import { Transaction } from '../../types';

interface IGetTransationByIdRepository {
    execute(TransationId: string): Promise<Transaction>;
}

export class GetTransationByIdUseCase {
    private readonly postgresGetTransationByIdRepository: IGetTransationByIdRepository;

    constructor(getTransationByIdRepository: IGetTransationByIdRepository) {
        this.postgresGetTransationByIdRepository = getTransationByIdRepository;
    }

    async execute(transationId: string): Promise<Transaction> {
        const transation =
            await this.postgresGetTransationByIdRepository.execute(
                transationId,
            );

        return transation;
    }
}
