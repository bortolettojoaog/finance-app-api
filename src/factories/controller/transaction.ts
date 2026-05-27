import { CreateTransactionController } from '../../controller/transaction/create-transaction';
import { GetTransationByIdController } from '../../controller/transaction/get-transaction-by-id';
import {
    PostgresCheckDeletedUserRepository,
    PostgresCreateTransactionRepository,
    PostgresGetTransactionByIdRepository,
    PostgresGetUserByIdRepository,
} from '../../repositories/postgres';
import {
    CreateTransactionUseCase,
    GetTransationByIdUseCase,
} from '../../use-cases';

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

export const makeGetTransactionByIdController = () => {
    const postgresGetTransactionByIdRepository =
        new PostgresGetTransactionByIdRepository();

    const getTransactionByIdUseCase = new GetTransationByIdUseCase(
        postgresGetTransactionByIdRepository,
    );

    const getTransactionByIdController = new GetTransationByIdController(
        getTransactionByIdUseCase,
    );

    return getTransactionByIdController;
};
