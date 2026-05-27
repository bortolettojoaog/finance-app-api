import { CreateTransactionController } from '../../controller/transaction/create-transaction';
import {
    PostgresCheckDeletedUserRepository,
    PostgresCreateTransactionRepository,
    PostgresGetUserByIdRepository,
} from '../../repositories/postgres';
import { CreateTransactionUseCase } from '../../use-cases';

export const makeCreateTransactionController = () => {
    const postgresCreateTransactionRepository =
        new PostgresCreateTransactionRepository();

    const postgresCheckDeletedUserRepository =
        new PostgresCheckDeletedUserRepository();

    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

    const createTransactionUseCase = new CreateTransactionUseCase(
        postgresCreateTransactionRepository,
        postgresGetUserByIdRepository,
        postgresCheckDeletedUserRepository,
    );

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    );

    return createTransactionController;
};
