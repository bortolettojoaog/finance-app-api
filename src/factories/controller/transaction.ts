import { UpdateTransactionController } from '../../controller/transaction';
import { CreateTransactionController } from '../../controller/transaction/create-transaction';
import { GetTransationByIdController } from '../../controller/transaction/get-transaction-by-id';
import {
    PostgresCheckDeletedUserRepository,
    PostgresCreateTransactionRepository,
    PostgresGetTransactionByIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepository,
} from '../../repositories/postgres';
import {
    CreateTransactionUseCase,
    GetTransationByIdUseCase,
    UpdateTransactionUseCase,
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

export const makeUpdateTransactionController = () => {
    const postgresUpdateTransactionRepository =
        new PostgresUpdateTransactionRepository();

    const postgresGetTransactionByIdRepository =
        new PostgresGetTransactionByIdRepository();

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        postgresUpdateTransactionRepository,
        postgresGetTransactionByIdRepository,
    );

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    );

    return updateTransactionController;
};
